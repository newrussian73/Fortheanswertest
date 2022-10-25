import pytest
import math
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.fixture(scope='function')
def answer():
    return str(math.log(int(time.time())))
#но так лучше


class Testcheckfixture():
    @pytest.mark.parametrize('link', ["https://stepik.org/lesson/236895/step/1",
                                      "https://stepik.org/lesson/236896/step/1",
                                      "https://stepik.org/lesson/236897/step/1",
                                      "https://stepik.org/lesson/236898/step/1",
                                      "https://stepik.org/lesson/236899/step/1",
                                      "https://stepik.org/lesson/236903/step/1",
                                      "https://stepik.org/lesson/236904/step/1",
                                      "https://stepik.org/lesson/236905/step/1"])
    def test_link1(self, browser, link, answer):
        browser.get(link)
        browser.implicitly_wait(15)
        # answer = str(math.log(int(time.time()))) - можно итак
        browser.find_element(By.CSS_SELECTOR, 'textarea').send_keys(answer)
        WebDriverWait(browser, 12).until(EC.element_to_be_clickable((By.CLASS_NAME, 'submit-submission'))).click()
        feedback1 = WebDriverWait(browser, 5).until(
            EC.visibility_of_element_located((By.CLASS_NAME, 'smart-hints__hint'))).text
        assert feedback1 == 'Correct!', 'test dead link'
        return feedback1


