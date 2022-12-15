# nailtrest

## Sistemos paskirtis

Žmogus, norėdamas naudotis šia platforma turės prisiregistruoti prie sistemos. Kiekvienas registruotas vartotojas galės įkelti idėją. Jei kitiems sistemos naudotojams labai patiks kažkieno kito įkelta idėja, jie galės ją pakomentuoti. Taip pat sistema turės administratoriaus rolę, turės patvirtinti viešai platinamas idėjas, galės peržiūrėti paviešintas idėjas ir trinti kitų žmonių komentarus. Sistemoje bus 3 taikomosios srities objektai tarpusavyje susieti prasminiu ir hierarchiniu ryšiu: naudotojo kolekcija > idėja > komentaras.

## Funkciniai reikalavimai
    
  Neregistruotas naudotojas galės:
  
    1.	Peržiūrėti sistemos prisijungimo puslapį.
    
    2.	Prisijungti prie sistemos.
    
    3. Užsiregistruoti prie sistemos.
    
    
  Registruotas naudotojas galės:
      
    1.	Atsijungti nuo sistemos.
    
    2.	Pridėti, peržiūrėti, redaguoti, trinti savo idėjas. 
            
    3.	Pakomentuoti paskelbtas idėjas.
    
    4.	Ištrinti ar redaguoti savo komentarus.
        
    5.	Pridėti, peržiūrėti, redaguoti, trinti kolekciją. 
    
    
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

