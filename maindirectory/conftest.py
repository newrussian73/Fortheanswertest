import pytest
from selenium import webdriver
from os import getenv
from selenium.webdriver.chrome.options import Options

def pytest_addoption(parser):
    parser.addoption('--browser_name', action='store', default ='chrome',
                     help="Choose browser: chrome or firefox")


@pytest.fixture(scope='function')
def browser(request):
    browser_name = request.config.getoption("browser_name")
    if browser_name == 'chrome':
        print('\nstart browser for test..')
        browser = webdriver.Chrome()
    elif browser_name == 'firefox':
        print('\nstart browser for test..')
        browser=webdriver.Firefox()
    yield browser
    print('\nquit browser..')
    browser.quit()