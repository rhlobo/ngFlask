# BASE IMAGE:  https://github.com/phusion/baseimage-docker
# VERSIONS:    https://github.com/phusion/baseimage-docker/blob/master/Changelog.md
FROM phusion/baseimage:0.9.15

MAINTAINER Roberto Lobo <rhlobo@gmail.com>


# PREPARATING BASE IMAGE
## Setting environment variables
ENV HOME /root
ENV DEBIAN_FRONTEND noninteractive
## Disabling SSH access
RUN rm -rf /etc/service/sshd /etc/my_init.d/00_regen_ssh_host_keys.sh


# INSTALLING SERVICES
RUN apt-get --quiet update
## Installing base software
RUN apt-get install --yes --quiet build-essential git
RUN apt-get install --yes --quiet software-properties-common python-software-properties
## Installing PYTHON
RUN apt-get install --yes --quiet python python-dev python-setuptools
RUN apt-get install --yes --quiet python-pip
## Installing NGINX
RUN add-apt-repository --yes ppa:nginx/stable
RUN apt-get --quiet update
RUN apt-get install --yes --quiet nginx
## Installing SUPERVISOR
RUN apt-get install --yes --quiet supervisor
#RUN apt-get install --yes --quiet sqlite3
RUN pip install uwsgi


# COPY APP FILES
ADD . /home/docker/files/


# CONFIGURATING
## Configurating NGINX
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN rm -Rf /etc/nginx/sites-enabled/default
RUN ln -s /home/docker/files/infra/nginx-app.conf /etc/nginx/sites-enabled/
RUN ln -s /home/docker/files/infra/uwsgi_params /etc/nginx/sites-enabled/
## Configurating SUPERVISOR
RUN ln -s /home/docker/files/infra/supervisor-app.conf /etc/supervisor/conf.d/
## Configurating application dependencies
RUN pip install -r /home/docker/files/requirements.txt


# SERVICE INITIALIZATION
CMD ["supervisord", "-n"]


# EXPOSING SERVICES
EXPOSE 80


# CLEAN UP
## Cleaning up APT
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*