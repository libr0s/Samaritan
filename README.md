# Samaritan
Volunteer app

## Struktura folderów
- `/samaritan-web` - aplikacja webowa dla organizacji
- `/samaritan-mobile` - aplikacja mobilna dla wolontariuszy
- `/samaritan-backend` - backend

## Backend
W celu uruchamiania backendu potrzebny jest `docker` oraz `docker-compose`. Zalecane jest korzystanie z `dockera` pod linux'em. W przeciwnym przypadku spotkamy się z duzym narzutem maszyny wirtualnej :/

Aby uruchomić aplikację piszemy: 
```
docker-compose build
```
Dzięki czemu zbudujemy obrazy i wszystkie zaleznosci.
Następnie piszemy:
```
docker-compose up
```
I nasza aplikacja wstaje z kolan ;)

Dodatkowym krokiem aby w pełni cieszyć się backendem jest minimalne przygotowanie bazy danych.
Aby to zrobić nalezy wpisac, przy wlaczonym `docker-compose`:
```
$ docker exec -ti samaritan_backend_1 bash
```
A nastepnie wewnatrz kontenera:
```
$ flask shell
```
i w konsoli flask:
```
>>> bootstrap()
```
W ten sposób otrzymujemy kilka bazowych akcji oraz testowych wolontariuszy i organizacje o następujących loginach:
```
u1@wp.pl
u2@wp.pl
u3@wp.pl
```
i haśle: `test1234`.

