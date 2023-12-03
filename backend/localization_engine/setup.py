from setuptools import find_packages, setup

setup(
    name='localization_engine',
    packages=find_packages(include=['localization_engine']),
    version='0.1.0',
    description='Localization engine python library',
    author='Yuval Cohen',
    install_requires=[],
    setup_requires=['pytest-runner'],
    tests_require=['pytest==4.4.1'],
    test_suite='tests',    
)