# nailtrest


## Sistemos paskirtis

Žmogus, norėdamas naudotis šia platforma turės prisiregistruoti prie sistemos. Kiekvienas registruotas vartotojas galės įkelti idėją. Jei kitiems sistemos naudotojams labai patiks kažkieno kito įkelta idėja, jie galės ją pakomentuoti. Taip pat sistema turės administratoriaus rolę, turės patvirtinti viešai platinamas idėjas, galės peržiūrėti paviešintas idėjas ir trinti kitų žmonių komentarus. Sistemoje bus 3 taikomosios srities objektai tarpusavyje susieti prasminiu ir hierarchiniu ryšiu: naudotojo kolekcija > idėja > komentaras.



## Funkciniai reikalavimai
    
  Neregistruotas naudotojas galės:
  
    1. Peržiūrėti sistemos prisijungimo puslapį.
    
    2. Prisijungti prie sistemos.
    
    3. Užsiregistruoti prie sistemos.
    
    
  Registruotas naudotojas galės:
      
    1. Atsijungti nuo sistemos.
    
    2. Pridėti, peržiūrėti, redaguoti, trinti savo idėjas. 
            
    3. Pakomentuoti paskelbtas idėjas.
    
    4. Ištrinti ar redaguoti savo komentarus.
        
    5. Pridėti, peržiūrėti, redaguoti, trinti kolekciją. 
    
    
  Sistemos administratorius galės:
     
     1. Viską ką gali registruotas ir neregistruotas naudotas.
     
     2. Trinti ir redaguoti kitų narių komentarus.
     
     3. Trinti ir redaguoti kitų narių kolekcijas.
     
     4. Trinti ir redaguoti kitų narių idėjas.
    
    
    
    
## Pasirinktų technologijų aprašymas;
  
  Sistemos kliento pusė (front-end) bus kuriamas naudojantis React.js. Serverio pusė (back-end) bus kuriama naudojantis C# ASP.NET. Taip pat bus naudojama SQLServer duomenų bazė. 



## Sistemos architektūra 
  
Diegimo diagramoje pavaizduota, kad kuriama internetinė aplikacija, aplikacijų programavimo sąsaja ir duomenų bazė bus talpinami tame pačiame Azure serveryje.  Aplikacija su API komunikuos per HTTP. Taip pat  API komunikacija su duomenų baze vyks naudojant ORM sąsają. Naudotojo įrenginio naršyklė taip pat komunikuos per HTTP protokolą. 

![image](https://user-images.githubusercontent.com/44231038/191031948-078443b3-3b00-478c-a6c8-9ffd39a7761d.png)



## Naudotojo sąsajos projektas

### Prisijungimo lango wireframe ir realizacija sistemoje

![image](https://user-images.githubusercontent.com/44231038/207915541-549a662e-2050-4d1f-a09b-db84f9e9a4a7.png)![image](https://user-images.githubusercontent.com/44231038/207915586-dd852763-d75c-4e77-88a4-23a3c4fd7698.png)

### Registracijos lango wireframe ir realizacija sistemoje

![image](https://user-images.githubusercontent.com/44231038/207916447-f626813e-2462-43e0-a461-049e2c605a5c.png)![image](https://user-images.githubusercontent.com/44231038/207916472-ca8e0af6-0f82-410d-9842-4b692efb35a1.png)

### Kolekcijų peržiūros lango wireframe ir realizacija sistemoje

![image](https://user-images.githubusercontent.com/44231038/207919594-15a8f8ea-760b-43c7-a94b-dabd23c2f918.png)![image](https://user-images.githubusercontent.com/44231038/207919721-87ba8aa1-219e-4fcc-baf3-694865a629c3.png)

### Kolekcijos idėjų peržiūros lango wireframe ir realizacija sistemoje 

![image](https://user-images.githubusercontent.com/44231038/207920454-ac3326d9-720e-4feb-9c52-7e15f74ddf22.png)![image](https://user-images.githubusercontent.com/44231038/207920491-15123422-2ef3-498b-b12c-8685b5f5f622.png)

### Visų naudotojų idėjų peržiūros lango wireframe ir realizacija sistemoje

![image](https://user-images.githubusercontent.com/44231038/207920688-c8b72957-9b98-42ee-833c-69c6d635f901.png)![image](https://user-images.githubusercontent.com/44231038/207920716-472436a2-31cc-4136-a4ef-29df3286ebb7.png)

### Konkrečios idėjos peržiūros lango wireframe ir realizacija sistemoje

![image](https://user-images.githubusercontent.com/44231038/207922248-962b9d3f-b099-46d8-8595-e31b6a4ad951.png)![image](https://user-images.githubusercontent.com/44231038/207922294-1b63c6c5-6ca3-4258-a816-25b532b975d3.png)

### Likusių langų ir modalinių langų realizacija sistemoje:

![image](https://user-images.githubusercontent.com/44231038/207922493-cbc20e12-5e6b-4b50-a3ac-98353632cb78.png)

![image](https://user-images.githubusercontent.com/44231038/207922532-ba529320-d9c8-4d44-84cf-93e95720397c.png)

![image](https://user-images.githubusercontent.com/44231038/207922565-0490e6f0-501c-43f1-b3e5-39f6e83e40df.png)

![image](https://user-images.githubusercontent.com/44231038/207922604-12c474fb-bdc4-49e2-b70e-61a0394ba1fe.png)

![image](https://user-images.githubusercontent.com/44231038/207922653-93776307-d4b9-400a-9ce9-656d92f39b00.png)



## API specifikacija 

### GET collection

##### Parametrai

id - kolekcijos id

##### Galimi atsako kodai

```
404 - not found 
401 - unauthorized
200 -OK
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/2`

##### Atsakymas į pavyzdinę užklausą
 ```
{
    "id": 2,
    "name": "Simple minimalistic",
    "description": "Simple minimalistic nail ideas",
    "createdDate": "2022-12-07T13:57:43.6758309",
    "userId": "d3240b9c-fcd4-42fe-bfa6-b8e65b0317e4"
}
 ```
 
#### GET collections

##### Galimi atsako kodai

```
404 - not found 
401 - unauthorized
200 -OK 
```

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections`

##### Atsakymas į pavyzdinę užklausą

```
[
    {
        "id": 2,
        "name": "Simple minimalistic",
        "description": "Simple minimalistic nail ideas",
        "createdDate": "2022-12-07T13:57:43.6758309",
        "userId": "d3240b9c-fcd4-42fe-bfa6-b8e65b0317e4"
    },
    {
        "id": 5,
        "name": "Christmas nails",
        "description": "Ideas for christmas season!!",
        "createdDate": "2022-12-08T18:21:34.8974878",
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
    },
    {
        "id": 6,
        "name": "Black nails",
        "description": "Black is the new black",
        "createdDate": "2022-12-08T18:26:13.7397523",
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
    }
]
```

#### POST collection

##### Galimi atsako kodai

```
401 - unauthorized
201 - Created
``` 

##### Užklausos pavyzdys

`https://localhost:7054/api/collections`

Body:
```
{
    "Name": "Kaledooooos jau tuoj!!!",
    "Description": "Su šventėm kas skaito :)"
}
```

##### Atsakymas į pavyzdinę užklausą

```
{
    "id": 9,
    "name": "Kaledooooos jau tuoj!!!",
    "description": "Su šventėm kas skaito :)",
    "createdDate": "2022-12-15T17:33:04.8249079Z",
    "userId": "b2c8d275-8def-4bd1-b1fc-5921fbsfs12199"
}
```

#### DEL collection

##### Parametrai

id - kolekcijos id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found 
204 - no content 
```

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/10`

##### Atsakymas į pavyzdinę užklausą

{}

#### PUT collection

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found 
200 - OK
```

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/10`

Body:

```
{
    "description": "Naujas aprasymas "
}
```

##### Atsakymas į pavyzdinę užklausą

```
{
    "id": 9,
    "name": "Kaledooooos jau tuoj!!!",
    "description": "Naujas aprasymas ",
    "createdDate": "2022-12-15T17:33:04.8249079",
    "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412ss199"
}
```


#### GET all collection ideas

##### Parametrai

id - kolekcijos id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/4/ideas`

##### Atsakymas į pavyzdinę užklausą

```
[
    {
        "id": 16,
        "name": "Black nail faces",
        "description": "Cool looking nail art",
        "createdDate": "2022-12-08T18:26:49.7103519",
        "imageUrl": "https://i.pinimg.com/564x/99/ce/ab/99ceab98212a1fc4c4d304e91bf46f6b.jpg",
        "complexity": "Easy",
        "requiredMeans": "Black nail polish",
        "instruction": "Paint the nails as in the photo :)",
        "isVerified": false,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
    },
    {
        "id": 17,
        "name": "Black smoky nails",
        "description": "Smoke nails",
        "createdDate": "2022-12-08T18:27:31.1892738",
        "imageUrl": "https://i.pinimg.com/564x/34/15/ac/3415ac784144d25bc12f03b845b409f7.jpg",
        "complexity": "Easy",
        "requiredMeans": "Nail polish",
        "instruction": "Paint the nails as in the photo :)",
        "isVerified": false,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
    }
]
```

#### GET ideas

##### Galimi atsako kodai

```
401 - unauthorized
200 - OK 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/4/ideas`

##### Atsakymas į pavyzdinę užklausą

```
[
    {
        "id": 2,
        "name": "Minimal nails ",
        "description": "Suitable for summer!",
        "createdDate": "2022-12-07T13:58:26.8404794",
        "imageUrl": "https://i.pinimg.com/564x/5a/13/55/5a13557e9dd072e9e15a38f994409da4.jpg",
        "complexity": "Easy",
        "requiredMeans": "Nail polish :)",
        "instruction": "Paint nails by the picture",
        "isVerified": false,
        "collectionId": null,
        "userId": "d3240b9c-fcd4-42fe-bfa6-b8e65b0317e4"
    },
    {
        "id": 14,
        "name": "Holiday nails",
        "description": "Simple gold holiday nails",
        "createdDate": "2022-12-08T18:24:11.3988578",
        "imageUrl": "https://i.pinimg.com/564x/fb/92/4a/fb924a9c2cb0e55b1236a577ddbe995f.jpg",
        "complexity": "Normal",
        "requiredMeans": "Nail polish",
        "instruction": "Paint the nails as in the photo :)",
        "isVerified": false,
        "collectionId": null,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
    },
    {
        "id": 15,
        "name": "Festive sparkly nail art",
        "description": "Lots of glitter",
        "createdDate": "2022-12-08T18:25:35.9527179",
        "imageUrl": "https://i.pinimg.com/564x/bb/af/0c/bbaf0c65af0d2aa03eb99e55e66f6ee5.jpg",
        "complexity": "Normal",
        "requiredMeans": "Nail polish and glitter",
        "instruction": "Paint the nails as in the photo :)",
        "isVerified": false,
        "collectionId": null,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
    },
    {
        "id": 16,
        "name": "Black nail faces",
        "description": "Cool looking nail art",
        "createdDate": "2022-12-08T18:26:49.7103519",
        "imageUrl": "https://i.pinimg.com/564x/99/ce/ab/99ceab98212a1fc4c4d304e91bf46f6b.jpg",
        "complexity": "Easy",
        "requiredMeans": "Black nail polish",
        "instruction": "Paint the nails as in the photo :)",
        "isVerified": false,
        "collectionId": null,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
    },
    {
        "id": 19,
        "name": "Black Halloween nails",
        "description": "Ghosts!",
        "createdDate": "2022-12-08T18:29:35.0459871",
        "imageUrl": "https://i.pinimg.com/564x/d8/ab/d0/d8abd0cdf49a8fcaae565643af908acf.jpg",
        "complexity": "Easy",
        "requiredMeans": "Black nail polish",
        "instruction": "Pa",
        "isVerified": false,
        "collectionId": null,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
    }
]
```

#### GET idea

##### Parametrai

collectionId - kolekcijos id

id - idėjos id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/6/ideas/16`

##### Atsakymas į pavyzdinę užklausą

```
{
    "id": 16,
    "name": "Black nail faces",
    "description": "Cool looking nail art",
    "createdDate": "2022-12-08T18:26:49.7103519",
    "imageUrl": "https://i.pinimg.com/564x/99/ce/ab/99ceab98212a1fc4c4d304e91bf46f6b.jpg",
    "complexity": "Easy",
    "requiredMeans": "Black nail polish",
    "instruction": "Paint the nails as in the photo :)",
    "isVerified": false,
    "collectionId": {
        "id": 6,
        "name": "Black nails",
        "description": "Black is the new black",
        "createdDate": "2022-12-08T18:26:13.7397523",
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
        "user": null
    },
    "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
}
```

#### POST idea

##### Parametrai

collectionId - kolekcijos id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
201 - created 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/6/ideas`

Body:
```
{
        "name": "Funky nails",
        "description": "Funny nails",
        "imageUrl": "https://qph.cf2.quoracdn.net/main-qimg-af6174d19586c0ef303281a939ab05ee-lq",
        "complexity": "Normal",
        "requiredMeans": "Red nail polish, diamonds, nail glue",
        "instruction": "Paint nails red, but leave a space at the top right next to the cuticle. There you should glue the diamond "
}
```

##### Atsakymas į pavyzdinę užklausą

```
{
    "id": 22,
    "name": "Funky nails",
    "description": "Funny nails",
    "createdDate": "2022-12-15T17:54:19.9275365Z",
    "imageUrl": "https://qph.cf2.quoracdn.net/main-qimg-af6174d19586c0ef303281a939ab05ee-lq",
    "complexity": "Normal",
    "requiredMeans": "Red nail polish, diamonds, nail glue",
    "instruction": "Paint nails red, but leave a space at the top right next to the cuticle. There you should glue the diamond ",
    "isVerified": false,
    "collectionId": {
        "id": 6,
        "name": "Black nails",
        "description": "Black is the new black",
        "createdDate": "2022-12-08T18:26:13.7397523",
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
    },
    "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
}
```

#### DEL idea

##### Parametrai

collectionId - kolekcijos id

id - idėjos id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
204 - no content 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/6/ideas/22`

##### Atsakymas į pavyzdinę užklausą

{}

#### PUT idea

##### Parametrai

collectionId - kolekcijos id

id - idėjos id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/collections/6/ideas/17`

##### Atsakymas į pavyzdinę užklausą

```
{
    "id": 17,
    "name": "Naujas pavadinimas",
    "description": "Smoky nails",
    "createdDate": "2022-12-08T18:27:31.1892738",
    "imageUrl": "https://i.pinimg.com/564x/34/15/ac/3415ac784144d25bc12f03b845b409f7.jpg",
    "complexity": "Easy",
    "requiredMeans": "Nail polish",
    "instruction": "Paint the nails as in the photo :)",
    "isVerified": false,
    "collectionId": {
        "id": 6,
        "name": "Black nails",
        "description": "Black is the new black",
        "createdDate": "2022-12-08T18:26:13.7397523",
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
    },
    "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199"
}
```

#### GET all idea comments

##### Parametrai

ideaId - idėjos id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/ideas/1/comments`

##### Atsakymas į pavyzdinę užklausą

```
[
    {
        "id": 24,
        "content": "Grazu!! ",
        "createdDate": "2022-12-15T20:06:46.9489816",
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
        "userName": "test"
    }
]
```

#### GET comment

##### Parametrai

ideaId - idėjos id

id - komentaro id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/ideas/1/comments`

##### Atsakymas į pavyzdinę užklausą

```
{
    "id": 24,
    "content": "Grazu!! ",
    "createdDate": "2022-12-15T20:06:46.9489816",
    "idea": {
        "id": 17,
        "name": "Naujas pavadinimas",
        "description": "Smoky nails",
        "createdDate": "2022-12-08T18:27:31.1892738",
        "imageUrl": "https://i.pinimg.com/564x/34/15/ac/3415ac784144d25bc12f03b845b409f7.jpg",
        "complexity": "Easy",
        "requiredMeans": "Nail polish",
        "instruction": "Paint the nails as in the photo :)",
        "isVerified": false,
        "collection": null,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
        "user": null
    },
    "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
    "userName": "test"
}
```

#### POST comment


##### Parametrai

ideaId - idėjos id

##### Galimi atsako kodai

```
401 - unauthorized
201 - created 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/ideas/1/comments`

##### Atsakymas į pavyzdinę užklausą

```
{
    "id": 24,
    "content": "Grazu!! ",
    "createdDate": "2022-12-15T20:06:46.9489816+02:00",
    "idea": {
        "id": 17,
        "name": "Naujas pavadinimas",
        "description": "Smoky nails",
        "createdDate": "2022-12-08T18:27:31.1892738",
        "imageUrl": "https://i.pinimg.com/564x/34/15/ac/3415ac784144d25bc12f03b845b409f7.jpg",
        "complexity": "Easy",
        "requiredMeans": "Nail polish",
        "instruction": "Paint the nails as in the photo :)",
        "isVerified": false,
        "collection": null,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
    },
    "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
    "userName": "test"
}
```

#### DEL comment

##### Parametrai

ideaId - idėjos id

id - komentaro id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
204 - no content 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/ideas/1/comments`

##### Atsakymas į pavyzdinę užklausą

{}

#### PUT comment

##### Parametrai

ideaId - idėjos id

id - komentaro id

##### Galimi atsako kodai

```
401 - unauthorized
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://nailtrestapi.azurewebsites.net/api/ideas/1/comments`

##### Atsakymas į pavyzdinę užklausą

```
{
    "id": 24,
    "content": "Labai puiki ideja!",
    "createdDate": "2022-12-15T20:06:46.9489816",
    "idea": {
        "id": 17,
        "name": "Naujas pavadinimas",
        "description": "Smoky nails",
        "createdDate": "2022-12-08T18:27:31.1892738",
        "imageUrl": "https://i.pinimg.com/564x/34/15/ac/3415ac784144d25bc12f03b845b409f7.jpg",
        "complexity": "Easy",
        "requiredMeans": "Nail polish",
        "instruction": "Paint the nails as in the photo :)",
        "isVerified": false,
        "collection": null,
        "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
    },
    "userId": "b2c8d275-8def-4bd1-b1fc-5921fb412199",
    "userName": "test"
}
```

## Išvados

Modulio metu buvo sukurta veikianti ir savo funkcijas atliekanti nagų dailės mėgėjams skirta sistema. Buvo pagilintos ASP.NET ir React.Js žinios, susipažinta su REST API kūrimo specifika ir procesu. Implementuojant sistemos autorizaciją ir autentifikaciją buvo gilinamasi į JWT tokenų naudojimą ir pritaikymą kuriamai sistemai. Pagerintos web dizaino žinios. 
