from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import math

def calc(x):
    return str(math.log(abs(12*math.sin(int(x)))))
link='http://suninjuly.github.io/redirect_accept.html'

try:
    browser=webdriver.Chrome()
    browser.get(link)
    redirect_button=browser.find_element(By.CLASS_NAME,'trollface.btn.btn-primary')
    redirect_button.click()
    new_window=browser.window_handles[1]
    browser.switch_to.window(new_window)
    num1=browser.find_element(By.ID,'input_value')
    num=int(num1.text)
    y=calc(num)
    input1=browser.find_element(By.ID,'answer')
    input1.send_keys(y)
    finish_button=browser.find_element(By.CSS_SELECTOR,'button.btn')
    finish_button.click()
finally:
    time.sleep(5)
    browser.quit()

