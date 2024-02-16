# idn-area-vs-kpu

Comparing the Indonesia area data from [idn-area](https://github.com/fityannugroho/idn-area-data) and **KPU** scraped using [zakiego/pantau-pemilu-2024][1]

## Prerequisite

- [Bun](https://bun.sh)
- [PostgreSQL](https://www.postgresql.org)

## How to reproduce

- Scrape the KPU data

  You need to clone the scraper [(zakiego/pantau-pemilu-2024)][1], set the `DATABASE_URL` in `.env` file to your local PostgreSQL database, and follow the guide to run the scraper.

  > [!NOTE]
  >
  > @zakiego have provided the **hosted PostgreSQL database URL containing the scraped data**, so you can use it instead of scraping the data yourself in your local machine.
  >
  > See https://data-pemilu.vercel.app for more information.

- Clone this repository

  Clone this repository in separate project (different folder).

- Set the environment variables

  Copy the `.env.example` file, rename it to `.env`. Set the **`DB_URL`** with the PostgreSQL database URL containing the scraped data.

- Install the dependencies

  ```bash
  bun install
  ```

- Generate and migrate database

  ```bash
  bun db:generate && bun db:migrate
  ```

- Run the app

  ```bash
  bun start <area>
  ```

  > The `area` can be **provinces**, **regencies**, **districts**, or **villages**.
  >
  > It can only compare one type of area data in a single command execution.

## Output

The result will be saved in `.txt` file inside the `data` folder.

This is an example of a **districts** data comparison result:

> **`-`** means the data that exists in `idn-area` but not in `KPU`
>
> **`+`** means the data from `KPU` and doesn't exists in `idn-area`

```txt
- Expected  -  71
+ Received  + 199

@@ -590,5 +590,5 @@
  121704,PALIPI
  121705,HARIAN
- 121706,SIANJAR MULA MULA
+ 121706,SIANJUR MULA MULA
  121707,RONGGUR NIHUTA
  121708,PANGURURAN
@@ -913,5 +913,5 @@
  137402,PADANG PANJANG BARAT
  137501,GUGUAK PANJANG
- 137502,MANDIANGIN KOTO SELAYAN
+ 137502,MANDIANGIN K. SELAYAN
  137503,AUR BIRUGO TIGO BALEH
  137601,PAYAKUMBUH BARAT
@@ -1185,5 +1185,5 @@
  150703,MENDAHARA
  150704,RANTAU RASAU
- 150705,SADU
+ 150705,S A D U
  150706,DENDANG
  150707,MUARA SABAK BARAT
@@ -1478,5 +1478,5 @@
  167402,PRABUMULIH TIMUR
  167403,CAMBAI
- 167404,RAMBANG KAPAK TENGAH
+ 167404,RAMBANG KPK TENGAH
  167405,PRABUMULIH UTARA
  167406,PRABUMULIH SELATAN
@@ -1967,5 +1967,5 @@
  217204,BUKIT BESTARI
  310101,KEPULAUAN SERIBU UTARA
- 310102,KEPULAUAN SERIBU SELATAN
+ 310102,KEPULAUAN SERIBU SELATAN.
  317101,GAMBIR
  317102,SAWAH BESAR
@@ -4279,5 +4279,5 @@
  527103,CAKRANEGARA
  527104,SEKARBELA
- 527105,SELAPRANG
+ 527105,SELAPARANG
  527106,SANDUBAYA
  527201,RASANAE BARAT
```

[1]: https://github.com/zakiego/pantau-pemilu-2024
