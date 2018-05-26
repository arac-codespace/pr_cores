from pr_cores.settings import *

SECRET_KEY = os.environ.get('PR_CORES_SECRET_KEY')
DEBUG = True
ALLOWED_HOSTS = []
WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.dev.json'),
        }
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}