import time

from selenium import webdriver
from selenium.webdriver.common.by import By

link=("http://suninjuly.github.io/find_xpath_form")

try:
    browser=webdriver.Chrome()
    browser.get(link)

    input1=browser.find_element(By.NAME,"first_name")
    input1.send_keys("Ivan")
    input2=browser.find_element(By.NAME,"last_name")
    input2.send_keys("Ivanov")
    input3=browser.find_element(By.CLASS_NAME,"form-control.city")
    input3.send_keys("IVANOVO EYAY BEATCH")
    input4=browser.find_element(By.ID, "country")
    input4.send_keys("Russia")
    button=browser.find_element(By.XPATH, '//button[text()="Submit"]')
    button.click()

finally:
    time.sleep(10)
    browser.quit()