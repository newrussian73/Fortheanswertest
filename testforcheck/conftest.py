import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def pytest_addoption(parser):
    parser.addoption('--browser_name', action='store', default='chrome',
                     help="Choose browser: chrome or firefox")
    parser.addoption('--language', action='store',default='ru, en', help='choose language')



@pytest.fixture(scope='function')
def browser(request):
    browser_name = request.config.getoption("browser_name")
    language= request.config.getoption("language")
    if browser_name == 'chrome':
        print('\nstart browser for test..')
        options = Options()
        options.add_experimental_option('prefs', {'intl.accept_languages': language})
        browser = webdriver.Chrome(options=options)
    elif browser_name == 'firefox':
        print('\nstart browser for test..')
        fp = webdriver.FirefoxProfile()
        fp.set_preference("intl.accept_languages", language)
        browser = webdriver.Firefox(firefox_profile=fp)
    yield browser
    print('\nquit browser..')
    browser.quit()
