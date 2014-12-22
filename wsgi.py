#!/usr/bin/env python


import sys

import server.config.env as env
import server.app as server


instance = server.flask_instance


def run():
    mode = env.settings('ENVIRONMENT')
    if not mode:
        print 'Environment not defined correctly.'
        sys.exit(1)

    print 'Running in %s mode' % mode
    instance.run()


if __name__ == '__main__':
    run()