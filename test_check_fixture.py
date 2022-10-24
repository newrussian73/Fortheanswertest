import pytest
import math
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC




class Testcheckfixture():
    @pytest.mark.parametrize('link',["https://stepik.org/lesson/236895/step/1",
"https://stepik.org/lesson/236896/step/1",
"https://stepik.org/lesson/236897/step/1",
"https://stepik.org/lesson/236898/step/1",
"https://stepik.org/lesson/236899/step/1",
"https://stepik.org/lesson/236903/step/1",
"https://stepik.org/lesson/236904/step/1",
"https://stepik.org/lesson/236905/step/1"])
    def test_link1(self,browser,link):
        browser.get(link)
        browser.implicitly_wait(15)
        answer = str(math.log(int(time.time())))
        browser.find_element(By.CSS_SELECTOR,'textarea').send_keys(answer)
        WebDriverWait(browser,12).until(EC.element_to_be_clickable((By.CLASS_NAME,'submit-submission'))).click()
        feedback1 = WebDriverWait(browser,5).until(EC.visibility_of_element_located((By.CLASS_NAME,'smart-hints__hint'))).text
        assert feedback1 == 'Correct!', 'test dead link'
        return feedback1

    # def test_link2(self,browser):
    #     browser.get(link2)
    #     browser.implicitly_wait(15)
    #     browser.find_element(By.CSS_SELECTOR,'textarea').send_keys(answer)
    #     WebDriverWait(browser,12).until(EC.element_to_be_clickable((By.CLASS_NAME,'submit-submission'))).click()
    #     feedback2 = WebDriverWait(browser,5).until(EC.visibility_of_element_located((By.CLASS_NAME,'smart-hints__hint'))).text
    #     assert feedback2 == 'Correct!', 'test dead link2'
    #     return feedback2
    # def test_link3(self,browser):
    #     browser.get(link3)
    #     browser.implicitly_wait(15)
    #     browser.find_element(By.CSS_SELECTOR,'textarea').send_keys(answer)
    #     WebDriverWait(browser,12).until(EC.element_to_be_clickable((By.CLASS_NAME,'submit-submission'))).click()
    #     feedback3=WebDriverWait(browser,5).until(EC.visibility_of_element_located((By.CLASS_NAME,'smart-hints__hint'))).text
    #     assert feedback3 == 'Correct!','test dead link3'



