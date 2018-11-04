# Samaritan
Volunteer app

## Struktura folderów
- `/samaritan-web` - aplikacja webowa dla organizacji
- `/samaritan-mobile` - aplikacja mobilna dla wolontariuszy
- `/samaritan-backend` - backend

## Backend
W celu uruchamiania bakcendu potrzebny jest `docker` oraz `docker-compose`. Zalecane jest korzystanie z `dockera` pod linux'em. W przeciwnym przypadku spotkamy się z duzym narzutem maszyny wirtualnej :/

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
