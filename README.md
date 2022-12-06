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
