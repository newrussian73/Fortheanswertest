from selenium import webdriver
from selenium.webdriver.common.by import By
import time

link="http://suninjuly.github.io/registration1.html"
link2="http://suninjuly.github.io/registration2.html"
try:
    browser=webdriver.Chrome()
    #тут тест должен сработать
    browser.get(link)
    #тут тест должен упасть P.S. надо раскомментировать строку ниже
    #browser.get(link2)

    input1=browser.find_element(By.XPATH,'//input[@placeholder="Input your first name"]')
    input1.send_keys("test")
    input2=browser.find_element(By.XPATH,'//input[@placeholder="Input your last name"]')
    input2.send_keys("test")
    input3=browser.find_element(By.XPATH,'//input[@placeholder="Input your email"]')
    input3.send_keys("test")
    button=browser.find_element(By.CSS_SELECTOR,"button.btn")
    button.click()
    time.sleep(2)

    welcome_text_elt=browser.find_element(By.TAG_NAME,"h1")
    welcome_text=welcome_text_elt.text

    assert "Congratulations! You have successfully registered!"==welcome_text


finally:
    time.sleep(12)
    browser.quit()
