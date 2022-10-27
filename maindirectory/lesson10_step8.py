import time
import math
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def calc(x):
    return str(math.log(abs(12*math.sin(int(x)))))

link='http://suninjuly.github.io/explicit_wait2.html'
browser=webdriver.Chrome()

browser.get(link)
try:

    cost=WebDriverWait(browser,12).until(EC.text_to_be_present_in_element((By.ID,'price'),'$100'))
    button_book=browser.find_element(By.ID,'book')
    button_book.click()
    browser.implicitly_wait(5)
    num_not_str=browser.find_element(By.ID,'input_value')
    num=str(num_not_str.text)
    y=calc(num)
    input1=browser.find_element(By.ID,'answer')
    browser.execute_script('return arguments[0].scrollIntoView(true)',input1)
    input1.send_keys(y)
    button_submit=browser.find_element(By.ID,'solve')
    button_submit.click()
finally:
    time.sleep(5)
    browser.quit()