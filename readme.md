# apeman-api. Серверное приложение для менеджера пакетов apeman 

# Описание
Основная идея заключаеться в том, чтобы пользователь мог хранить все свои файлы, которые строго завязанны на архитектуре будущего проекта, можно было хранить на сервере и в нужный момент их с лёгкостью скачать в необходимое место на компьюторе. 

Серверное приложение с открытым исходным кодом для работы с файлами и не только. Приложение будет дополняться по мере появления новых идей по упрощению жизни в работе с паттернами.

Протестировать apeman-api можно в связке с менеджером пакетов apeman.

## Установка
0. Создайте дополнительно директории ```config/```, ```data/```, ```data/patterns/``` -- это обязательно (просто я не нашёл способ как мне загрузить на gitHub пустые папки, но я изучу этот вопрос)

1. Скачивайте архив или клонировать репозиторий ```git clone <Ссылка на репозиторий>```
2. Запустите команду ```npm ci``` для установки всех действующих пакетов в программе 
3. Запустите команду ```npm run build```, это необходимо для того, чтобы программа собрала проект в js коды для последующего их запуска.
4. Установите ```mySQL``` на ваш компьютер, если он у вас уже есть, то можно не париться.
5. Зайдите в рабочую область ```mySQL``` через терминал, запутив команду ```mysql -u root -p```, после чего вам будет необходимо указать пароль своей уч>тной записи для входа в cli приложение ```mySQL```. Далее создайте базу данных```CREATE DATABASE batya;``` 
6. Запустите команду```source <Директория, где располагается apeman-api>/batya.sql```, это необходимо для установки всех ключевых таблиц, используемых в программе.

После выполнения всех 4 пунктов, вы можете запустить сервер командой ```npm start``` 

## Запросы на сервер 
При обращении к серверу для работы с паттернами используем ссылку ```/api/patterns```

Таблица № Запрос/Ответ
|Суть запроса|Запрос|Тело запроса|Ответ|
|:-|:-|:-|:-|
|Добавление паттерна|```/add```|```name```, ```object```|```string```|
|Удаление паттерна|```/delete```|```name```|```string```|
|Проверка наличия паттерна|```/check```|```name```|```string```|
|Посмотреть весь список паттернов|```/checkAll```|```-```|```string```|
|Обновление паттерна|```/update```|```name```|```string```|
|Скачать паттерн|```/download```|```name```|```object```| 

Таблица № Всевозможные ответы от сервера на запрос ```/add```
|Код ответа|Тело ответа|
|:-|:-|
|403|Нет доступа|
|404|Неверные параметры запроса|
|200|Успешная передача и принятие данных|
|203|Неактуальные параметры запроса|

## config
В папке ```config/``` присутсвтуеют файл ```localhost.json``` в него нём содержаться все необходимые настройки серверного приложения. Если папки нет, то её нужно создать с файлом ```config/localhost.json``` в корневом каталоге.  

```json
{
"autorization": "",
"PORT": "",
"SQL": {
    "host": "",
    "database": "",
    "password": "",
    "user": ""
}
}   
```