# IMPETU-YAM: índice de contenidos

- [Introduccion y anteproyecto](#introduccion-y-anteproyecto)
  * [Datos generales:](#datos-generales-)
  * [Descripcion:](#descripcion-)
  * [Objetivos:](#objetivos-)
    + [Objetivos de sotfware:](#objetivos-de-sotfware-)
    + [Objetivos personales:](#objetivos-personales-)
  * [Tecnologias:](#tecnologias-)
- [Desarrollo de la aplicacion](#desarrollo-de-la-aplicacion)
  * [Analisis previo:](#analisis-previo-)
    + [Modelo relacional](#modelo-relacional)
    + [Mockup de pantallas](#mockup-de-pantallas)
  * [Implementación:](#implementacion-)
  * [Produccion:](#produccion-)
- [Despliegue](#despliegue)
- [Resultados y conclusiones](#resultados-y-conclusiones)
- [Bibliografia y webgrafia](#bibliografia-y-webgrafia)

# Introduccion y anteproyecto

## Datos generales:
> **Proyecto:** Aplicación Web para la empresa impetu-yam

> **Autor:** [Damián Ivanov Kotchev](https://github.com/Bellothornus2)

> **Ciclo formativo:** Desarrollo de Aplicaciones Web

> **Fecha de entrega:** junio 2022.


## Descripcion:
Este proyecto web se encarga de gestionar los pedidos de los alcoholes de la empresa *Impetu-Yam* que los usuarios de todo el mundo puedan pedir, se mostrará una lista de alcoholes 
por pedido de usuario ya que nunca carecerán de existencias pues todas son a pedido y poder gestioanr de manera ágil y sencilla los pagos online se podrá hacer Big-Data dependiendo
de que usuarios compren que alcoholes o tipos de alcohol, con que frecuencia, que poder adquisitvo tienen, etcétera.

## Objetivos:
### Objetivos de sotfware:
* Desarrollar una API para poder enviar y recibir datos con formato JSON a escala global y estándar.
* Desarrollar una interfaz gráfica bonita e intuitivo de usar para que los usuarios puedan interactuar con esos datos. 
* Intentar Estandarizar el código para que otros desarrolladores puedan trbajar en el proyecto sin mucho tiempo d eformación, sobre todo en la API.
* Emplear las versiones más recientes de las tecnologías utilizadas (vue 3, bootstrap 5, etc.)

### Objetivos personales:
* Desarollar en un futuro una herramienta para poder sistemizar y parametrizar el desarrollo de la API y la gestión de Bases de datos.
* Con la herramienta antes mencionada podría desarollar todos mis proyectos futuros, tanto personales como profesionales.
* Conseguir clientes para poder desarrollarles la parte del Back-end entero, desde el diseño d ebase de datos hasta el Back-Office para que ellos lo gestionen.
* Conseguir que empresas alquilen mi herramienta antes mencionada para poder ahorrarles horas y horas de trabajo.

## Tecnologias:
* Lenguajes: Javascript, HTML5, CSS 3, Bootstrap 5
* Frameworks: Vue 3 para la interfaz gráfica web y flask 1.1.2 para la creación y gestión del envío de información en JSON
* Bases de datos, *almacenamiento* y *hosting*: SQLite

# Desarrollo de la aplicacion

## Analisis previo:
Para la empresa Joven Impetu-Yam que comercia intergalácticamente entre humanos y extraterrestres, es básico que esta aplicación cumpla tres objetivos:
1. Sea Fácil de manejar la página web por los usuarios estándar.
2. Permita la legibilidad de los datos y presentación bonita de los mismos.
3. Sea de fácil mantenimiento.

Los requisitos antes mencionados me han llevadoa pensar que e smejor utilizar tecnologías ya conocidas y que sean de fácil manejo, como Flask y Vue, ya que python lo usa todo el mundo
y flask es un framework para crear API's muy liviano y ligero, que peude escalar y acomplejarse a medida que crece el proyecto sin ningún problema, Vue por su lado nos deja crear componentes
y poder reutilizar el código solo cambiando algunas palabras clave.

### Modelo relacional
Opté por utilizar SQLite ya que su funcionamiento va por archivos y no por conexión a servicios de un servidor esto lo que me permite es poder desplegar la base de datos mas rápidamente
y poder gestionar copias de seguridad con mucha mas facilidad, y mantener los tres pilares (producción,testing,desarollo) mas a mano:
1. Ingredient
2. Alcohol
3. TypeAlcohol
4. SubType Alcohol
5. IngredientAlcohol
6. User
7. Address
8. CreditCard
9. Order
10. OrderLine
11. Review

En cada Tabla se guardará sus registros con ciertas columnas o campos como los siguientes:
* Para *Ingredient*: name
* Para *Alcohol*: name,alcohol_grade,price,brand,type_alcohol_id,subtype_alcohol_id,description
* Para *TypeAlcohol*: name
* Para *SubTypeAlcohol*: type_alcohol_id, name
* Para *IngredientAlcohol*: alcohol_id, ingredient_id
* Para *User*: name, surname, age, dni, username, password, sex, phone_number, email, verified_user
* Para *Address*: street,street_number,floor,door,zip_code,other_data,type_address,user_id
* Para *CreditCard*: card_number,expire_date,cvv,owner_name,user_id
* Para *Order*: user_id,address_bill,address_send,credit_card,total_amount,date_str
* Para *OrderLine*: alcohol_id, quantity,price,discount,neto,order_id
* Para *Review*: user_id,message,user_rating,alcohol_id,order_id,user_sentiment


### Mockup de pantallas
¿Jaja te imaginas?

## Implantación:
La idea era crear una portada y página de inicio con un buen SEO para poder posicionarse con los usuarios públicos puedan ver que productos se venden y si hay ofertas.

Se tiene que difeenciar tres tipos de usuario en este tipo de aplicaciones:
1. usuario público: Este usuario no está registrado y no podrá hacer nada excepto visitar la página pricnpial para saber de que e sla empresa, la tienda que prodcutos ofrecen y contactar con la empresa para dudas o peticiones específicas
2. Usuarios registrados: Este usuario ya lo registra el sistema y e snecesario para que se puedan hacer compras dentro de ella
3. Usuarios administradores: Estos usuarios solo tendrían acceso al BackOffice y nada mas para poder gestionar el contenido de la tienda, los ingredientes de los alcoholes, los nuevos tipos que pueda haber, gestionar y visualizar datos sensible scomo albaranes de otras personas etcétera.

En resumen:
1. usuario Público solo puede ver y contactar con la empresa
2. usuario registrado puede comprar
3. usuario administrador son empleados de la empresa para poder gestioanr los datos

Decidido esto he tenido que plantear las diferentes funcionalidades que quiero desarrollar en la aplicación:
* Registro e inicio de sesión de usuarios.
* el mantenimiento de todas las tablas mediante la API en flask y que la consuma VUE por interfaz gráfica con ajax y fetch 
* Contacto: Una página web sencilla con un formulario básico para poder contactar ocn la mepresa mediante email o whatsapp profesional.
* Reseñas: Las reseñas son agrupadas por que alcohol van dirigidas y son escritas por usuarios registrados que lo han comprado alguna vez para poder decirles en público si les ha gustado o no.
* Carrito de compra: Permite a los usuarios visualizar su carrito de compra y poder finalizarla para que se cree un Albarán con sus datos y se pueda enviar a su dirección de envío.

## Producción:
La idea es compilarlo todo en una imagen de Docker par despues poder generar los contenedores y poder correrlos en un servidor remoto con un nombre de dominio customi... que nooo..., personalizado la parte de Docker está hecha y e ssencillo de hacer y entender pero el despliegue en remoto no

La idea es mantener el inicio de sesión de los usuario mediante VUEx pero como no se ha tenido tiempo de desarollarlo ni formación para entederlo no s eha podido implantar en el proyecto. 

La idea es generar y redirigir a los ususarios que no tiene permiso o acceden a rutas inexistentes a una página genérica de error 404 pero al final tampoco s eha podido implantar 

# Despliegue
La idea es desplegarlo en un servidor remoto que tengamos acceso completo para personalizarlo y gestioanrlo a nuestro gusto, algunas páginas web de empresas te lo permiten hacer por un módico precio, pero como no contamos presupuesto no empezamos a usarlo, además del nombre de dominio personalizado y la ejecución del docker par nuestra aplicación

El acceso a este servidor remoto está protegida con usuario y contraseña además de un buen cortafuegos

# Resultados y conclusiones
No estoy nada satisfecho con este proyecto, ya que me parece una absoluta pérdida de tiempo que no podré ni vender ni ponerlo como Portfolio ya que es muy básico y simple además de no poder cobrar por las horas ya realizadas siento que no he hecho nada, y que sería mas productivo e incluso comercial la idea de desarollo de la herramienta mencionada hace unos apartados atrás de poder parametrizar dentro de lo posible el desarollo del backend y que en resumidas cuentas con un par de líneas de comando te pueda generar: toda la estructura de *controller*, *services* y *testing* con todo su código ya funcionando + el BackOffice con una plantilla por defecto que se puede cambiar por otra si se quiere para que los administradores de otras empresas la puedan usar y la creación de la base de datos quizá por consola o una extensión de la herramienta que sepa leer modelos UML además de poder agregar restricciones sencillas (como no poder guardar usuarios menores de edad) o triggers (como guardar un histórico de los cambios de una tabla despues de realizar un *update*, *delete* o *create*) y actualizar el código según conveniencia además de encargarse del tema de permisos de acceso o edición de los datos o página web con usuarios y roles, aunque eso es mas Django que Flask.

Todo esto puede ahorrarnos horas y horas de trabajo en unos simples minutos. Poder facturarle al cliente 60h de Backend y hacerla en 1h-2h es algo que muy pocas empresas pueden Jactarse de ello, un ejemplo que conozco es una empresa de viajes enorme y que trbaajan aquí, gracias a un Symphony *tuneado* que ellos tienen, hacen precisamente eso.

Es algo que, si realizado, podría venderlo a otras empresas o usarlo para mis propios desarollos, mientras me pagan por el tiempo teórico que tarda en hacerse un Backend a pelo.

Todo esto se ha planteado porque hice el mantenimiento de las tablas de un FCT anterior para ITTravel Services que se traducía en manteneer 15 tablas para que diferentes empresas pudiesen gestionar sus pasos para cumplir la agenda 2030 de la ONU, la cosa es que estbaa yo solo siendo Junior creando la app desde cero hasta su 80% de acabdo (estaba 1 mes y medio haciendo pácticas) sin incluir los testing pero si los permisos, tardé unas 5h*20días = 100h de desarollo puro ya que dos semana he estado formandome para algo que podía ser automático quizá excepto por varias excepciones como la subida de archivos, que incluso con una vuelta de idea en la cabeza, se pueda automatizar y parametrizar tambien.

Y ahora tambien al hacer este proyecto se me vino a la mente esas horas tortuosas de hacer lo mismo pero cambiando una palabra clave, no solo eso, imagínate que el cliente viene y te dice "el usuario 'x' ahora no podrá crear en general" estás tú 4 horas cambiando sus permisos, para que te diga "uy, no, que era que no podía eliminar en general", esto es verídico y pasó en Cocodin, 8 horas de trabajo porque no se parametrizaba los permisos, se hacían a pelo y el cliente no sabe lo que quiere, que sí, es mas dinero (para la empresa, que obviamente facturará eso) pero tú como empleado te quedas con cara de póker.

No se han realizado la mayor parte de las tareas básicamente por procrastinación, no porque sean complejas o difíciles.

# Bibliografia y webgrafia
Para la elaboración de este proyecto se han consultado los siguientes recursos:
* [Índice para Readme](https://ecotrust-canada.github.io/markdown-toc/)
* [Vue 3 Cheat Sheet](https://www.vuemastery.com/pdf/Vue-3-Cheat-Sheet.pdf)
* [Resolución Vue con Bootstrap5](https://github.com/apgapg/vue_bootstrap_5_sample)
* [Semantic GIT](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

