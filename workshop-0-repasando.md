# Workshop 0: Repasando JavaScript

## Introducción

Bienvenidos al Workshop 0, donde repasaremos conceptos fundamentales de JavaScript. Este workshop está diseñado para evaluar y reforzar tus conocimientos previos antes de comenzar con el curso de TypeScript y Node.js. A través de actividades prácticas, exploraremos temas clave y desarrollaremos aplicaciones que integren estos conceptos de manera creativa y real.

## Instrucciones de Entrega

1. Crea un nuevo repositorio en tu cuenta de GitHub llamado `workshop-0-repaso-js-node`.
2. Copia las preguntas y ejercicios de este workshop en el archivo `README.md` de tu repositorio.
3. Resuelve cada pregunta y ejercicio en su respectiva sección.
4. Realiza un commit y un push de tus respuestas y código a GitHub.
5. Subir a Moodle en el espacio habilitado de semana 1 el link del repositorio en GitHub. En caso de no estar habilitado el envío en Moodle, enviar el link del repo a `nicolas.picon@riwi.io`.

## Instrucciones Generales

1. No se aceptarán preguntas sobre ninguno de los ejercicios.

## Objetivos

1. **Conocimiento**: Identificar y describir los conceptos clave de JavaScript y Node.js.
2. **Comprensión**: Explicar y comparar diferentes estructuras y técnicas de programación en JavaScript y Node.js.
3. **Aplicación**: Implementar soluciones prácticas que utilicen estos conceptos en aplicaciones reales.

## Punto 1: Ejercicio Guiado - Creando una Aplicación de Gestión de Tareas

En este primer punto, crearás una aplicación de gestión de tareas que te permitirá añadir, editar, eliminar y marcar tareas como completadas. Durante el proceso, se evaluarán los siguientes temas:

- JavaScript Básico
- Manipulación del DOM
- Programación Orientada a Objetos (OOP)
- Eventos en JavaScript
- Variables y Tipos de Datos
- Control de Flujo
- Funciones de Flecha
- JSON
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación de gestión de tareas que me permita añadir, editar, eliminar y marcar tareas como completadas para organizar mis actividades diarias de manera eficiente.

### Criterios de Aceptación

1. **Añadir una Tarea**:
   - Debe existir un campo de entrada y un botón para añadir una nueva tarea.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

2. **Editar una Tarea**:
   - Debe ser posible editar la descripción de una tarea existente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

3. **Eliminar una Tarea**:
   - Debe existir un botón para eliminar una tarea.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

4. **Marcar una Tarea como Completada**:
   - Debe ser posible marcar una tarea como completada y debe visualizarse de manera diferente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript, Clases y Objetos.

5. **Almacenar Tareas en localStorage**:
   - Las tareas deben ser almacenadas en `localStorage` y recuperadas al recargar la página.
   - **Concepto de JavaScript aplicado**: JSON, Almacenamiento en localStorage.

6. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

7. **Validación y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.


#### HTML

```html
<!DOCTYPE html> <!-- Recordemos que el DOCTYPE es la primera línea de un documento HTML y se utiliza para indicar al navegador qué tipo de documento se está utilizando. -->
<html lang="en"> <!-- La etiqueta <html> es el contenedor raíz de todo el contenido de una página web. El atributo lang se utiliza para especificar el idioma de la página. -->
<head> <!-- La etiqueta <head> contiene información sobre el documento, como metadatos, enlaces a estilos y scripts, y otros elementos que no se muestran directamente en la página. -->
    <meta charset="UTF-8"> <!-- La etiqueta <meta> se utiliza para especificar metadatos, como el juego de caracteres utilizado en el documento. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- La etiqueta <meta> con el atributo name="viewport" se utiliza para controlar el tamaño y la escala de la página en dispositivos móviles. -->
    <title>Gestión de Tareas</title> <!-- La etiqueta <title> se utiliza para especificar el título de la página, que se muestra en la pestaña del navegador. -->
    <link rel="stylesheet" href="styles.css"> <!-- La etiqueta <link> se utiliza para enlazar una hoja de estilos externa con la página. -->
</head>
<body> <!-- La etiqueta <body> contiene todo el contenido visible de una página web, como texto, imágenes, enlaces, formularios, etc. -->
    <div id="app"> <!-- La etiqueta <div> se utiliza para agrupar elementos y crear secciones en una página web. El atributo id se utiliza para identificar un elemento de forma única. -->
        <h1>Gestión de Tareas</h1> <!-- La etiqueta <h1> se utiliza para definir un encabezado de nivel 1 en una página web. -->
        <input type="text" id="new-task" placeholder="Nueva tarea"> <!-- La etiqueta <input> se utiliza para crear campos de entrada en formularios. El atributo type se utiliza para especificar el tipo de campo (e.g., texto). El atributo id se utiliza para identificar un campo de forma única. El atributo placeholder se utiliza para mostrar un texto de ayuda en el campo. -->
        <button id="add-task">Añadir Tarea</button> <!-- La etiqueta <button> se utiliza para crear botones en una página web. El atributo id se utiliza para identificar un botón de forma única. -->
        <ul id="task-list"></ul> <!-- La etiqueta <ul> se utiliza para crear listas no ordenadas en una página web. El atributo id se utiliza para identificar una lista de forma única. -->
    </div>
    <script src="app.js"></script> <!-- La etiqueta <script> se utiliza para enlazar un archivo de script con la página. -->
</body>
</html>
```

#### JavaScript

```javascript
class Task { // Define la clase "tarea" desde la cual se derivarán todas las instancias. Cada una será una tarea diferente
    constructor(id, description, completed = false) { //Define el constructor de la clase "Task" y se definen sus argumentos de entrada que deberán ser pasados en el método del objeto al crearlo. Las tareas creadas por defecto no están completadas
        this.id = id; // Define "id" que es un argumento de entrada como atributo "id" de la clase Task
        this.description = description; // Define "description" que es un argumento de entrada como atributo "description" de la clase Task
        this.completed = completed; // Define "completed" que es un argumento de entrada como atributo "completed" de la clase Task. Por defecto es falso
    }

    toggleComplete() { // Define un método para activar o desactivar el estado de la tarea
        this.completed = !this.completed;
    }
}

class TaskManager { // Define la clase para gestionar las tareas
    constructor() { // Define el constructor de la clase
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Obtiene todas las tareas, que deberían estar definidas en el atributo "tasks" del almacenamiento local del navegador
        this.loadTasks(); // Llama al método de la clase encargado de renderizar todas las tareas en el DOM
    }

    addTask(description) { // Método para agregar una tarea al storage y luego refrescar el DOM con la lista de tareas actualizada
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1; //Id autoincrementado. Si el id no existe, asigna 1
        const task = new Task(id, description); // Crea una nueva instancia de la clase "Tarea" y asigna el id y la descripción. La tarea por defecto no está completada.
        this.tasks.push(task); //Agrega la tarea al array de tareas
        this.saveTasks(); //Guarda el array actualizado de las tareas en el almacenamiento local del navegador
        this.renderTasks(); // Muestra el array de tareas actualizado
    }

    deleteTask(id) { //Método para eliminar una tarea basado en el id
        this.tasks = this.tasks.filter(task => task.id !== id); //Devuelve las tareas que NO coincidan con el id
        this.saveTasks(); //Guarda el array de tareas filtrado en el almacenamiento local del navegador
        this.renderTasks(); //Muestra el array de tareas actualizado
    }

    toggleTaskComplete(id) { //Método que cambia el estado de la tarea entre completada y no completada
        const task = this.tasks.find(task => task.id === id); //Encuentra una tarea en el array de tareas basado en el id.
        if (task) { // Si la tarea existe...
            task.toggleComplete(); //Pásela al estado contrario. Es decir, si está no completada, pásela a completada y visceversa
            this.saveTasks(); //Guarda el array de tareas filtrado en el almacenamiento local del navegador
        this.renderTasks(); //Muestra el array de tareas actualizado
        }
    }

    saveTasks() { // Método que guarda un array de tareas en el almacenamiento local del navegador
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() { // Método que llama a otro método para renderizar el array de tareas que está almacenado en la memoria local del navegador
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list'); //Se obtiene el objeto HTML del DOM que contiene la lista de tareas
        taskList.innerHTML = ''; // Se limpia el contenido del elemento HTML seleccionado
        this.tasks.forEach(task => { // Recorriendo el array de tareas
            const item = document.createElement('li'); //Se crea un elemento de tipo lista
            item.textContent = task.description; // Se inserta la descripción de la tarea en el contenido del elemento "li"
            item.className = task.completed ? 'completed' : ''; // Se asigna  una clase al elemento "li" dependiendo del estado de la tarea
            item.addEventListener('click', () => this.toggleTaskComplete(task.id)); // Se agrega un escuchador de eventos al item de manera que al hacer click, se llame al método "toggleTaskComplete"

            const deleteButton = document.createElement('button'); // Se crea un elemento tipo botón
            deleteButton.textContent = 'Eliminar'; // Se le agrega texto al elemento botón
            deleteButton.addEventListener('click', (e) => { //Se le agrega un escuchador de eventos al botón
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id); // Método desencadenado al hacer click en el botón "eliminar"
            });

            item.appendChild(deleteButton); //Se añade el botón al elemento "li"
            taskList.appendChild(item); //Se añade el elemento con el elemento "li" y el botón al array de elementos del HTML que contiene las tareas.
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { //Se agrega un escuchador de eventos que es disparado cuando se termina de cargar el contenido del DOM
    const taskManager = new TaskManager(); // Se crea una nueva instancia del gestionador de tareas

    document.getElementById('add-task').addEventListener('click', () => { // Se selecciona el elemento con id "add-task" y se le agrega un escuchador de eventos con click. Este elemento es un botón en el html para agregar tareas.
        const newTask = document.getElementById('new-task').value; // Se extrae el texto dentro del elemento HTML seleccionado y se almacena en la variable "newTask"
        if (newTask) { // Si hay una instancia de "Task"...
            taskManager.addTask(newTask); //se agrega la descripción de la tarea y su id y se almacena en el local storage
            document.getElementById('new-task').value = ''; // Se resetea el contenido del texto del elemento "new-task" en el DOM, que en este caso es un campo de entrada tipo texto.
        }
    });
});
```

### Descripción de la depuración del gestor de tareas

1. **Se agrega la funcionalidad de editar la tarea**:
    Primero se agrega el botón de editar en el método "renderTasks" de TaskManager. Luego se le agrega un escuchador que ejecute un callback que contiene un método TaskManager.editTask(). Este método pide al usuario una nueva descripción de la tarea y la inserta en el atributo de la tarea correspondiente.

2. **Se agrega un método para editar la tarea**:
    En el método TaskManager.toggleTaskComplete() hay un error al llamar el método toggleComplete de la clase Task, puesto que el objeto task no es realmente una instancia de Task, puesto que es tomada del local storage, por lo que es un objeto común y corriente. La corrección del error fue volver "task" en una instancia de "Task" y luego editar la propiedad de completed en el vector this.tasks del TaskManager para que se guardara el vector actualizado en el local storage

3. **Se agrega un archivo de estilos**:
    El método "renderTasks" de "TaskManager" renderiza la tarea y dependiendo de la propiedad "completed" de la tarea, agrega o no una clase llamada "completed". Entonces se agregó un archivo .css que aplicara un estilo con base en esta clase para poder visualziar en pantalla cuando la tarea es clickeada.

3. **Ejecución**: Probar la aplicación en un navegador y realizar las siguientes acciones:
    - Probar funcionalidad del codigo. Si encuentras errores, depurar el código, corregirlos y generar un informe de los errores encontrados y como
    los corregiste.
    - Añadir una nueva tarea.
    - Marcar una tarea como completada.
    - Eliminar una tarea.
    - Verificar que las tareas se almacenan y recuperan correctamente en `localStorage`.
4. **Analisis**: Explicar el código proporcionado linea por linea en el archivo `README.md` de tu repositorio.

## Punto 2: Ejercicio Independiente - Creando una Aplicación de Gestión de Notas

En este segundo punto, crearás una aplicación de gestión de notas que te permitirá añadir, editar, eliminar y marcar notas como importantes. Durante el proceso, se evaluarán los siguientes temas:

### Historia de Usuario

Como usuario, quiero una aplicación de gestión de notas para poder añadir, editar, eliminar y marcar notas como importantes, de manera que pueda organizar mis tareas y recordatorios de forma eficiente.

### Criterios de Aceptación

1. **Añadir una Nota**:
   - Debe existir un campo de entrada y un botón para añadir una nueva nota.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

2. **Editar una Nota**:
   - Debe ser posible editar la descripción de una nota existente.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

3. **Eliminar una Nota**:
   - Debe existir un botón para eliminar una nota.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript.

4. **Marcar una Nota como Importante**:
   - Debe ser posible marcar una nota como importante y debe visualizarse de manera destacada.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Eventos en JavaScript, Clases y Objetos.

5. **Almacenar Notas en localStorage**:
   - Las notas deben ser almacenadas en `localStorage` y recuperadas al recargar la página.
   - **Concepto de JavaScript aplicado**: JSON, Almacenamiento en localStorage.

6. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

7. **Validación y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.

### Ejercicio

Desarrolla la aplicación de acuerdo a los criterios de aceptación mencionados. Asegúrate de probar la aplicación en un navegador y realizar las siguientes acciones:

1. Añadir una nueva nota.
2. Editar una nota existente.
3. Marcar una nota como importante.
4. Eliminar una nota.
5. Verificar que las notas se almacenan y recuperan correctamente en `localStorage`.
6. Documentar el proceso y el código en el archivo `README.md` de tu repositorio.

## Punto 3: Ejercicio Guiado - Consumiendo una API con JSONPlaceholder

En este tercer punto, crearás una aplicación que consuma datos de una API utilizando JSONPlaceholder. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- JSON
- Promesas
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación que consuma datos de una API pública, para visualizar y gestionar información de manera eficiente.

### Criterios de Aceptación

1. **Consumo de API**:
   - La aplicación debe consumir datos de la API de JSONPlaceholder (https://jsonplaceholder.typicode.com/posts).
   - **Concepto de JavaScript aplicado**: Promesas, JSON.

2. **Visualización de Datos**:
   - Los datos obtenidos de la API deben visualizarse en la página de manera estructurada.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

3. **Manejo de Errores**:
   - Implementar manejo de errores para la solicitud de la API y mostrar mensajes de error adecuados al usuario.
   - **Concepto de JavaScript aplicado**: Promesas, Depuración.

4. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos y procesamiento de datos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha.

### Ejemplo de Código

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consumiendo API con JSONPlaceholder</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <h1>Listado de Posts</h1>
        <button id="fetch-posts">Cargar Posts</button>
        <ul id="post-list"></ul>
        <div id="error-message"></div>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

#### JavaScript

```javascript
document.getElementById('fetch-posts').addEventListener('click', () => {
    fetchPosts(); // Se agrega al botón con id "fetch-posts" una función que ejecuta la función que contiene la promesa para hacer la petición y procesar la información
});

const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Se utiliza la API fetch para hacer una consulta tipo "GET" a la url y obtener todos los posts
        .then(response => { // Se toma la respuesta de la petición
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText); //Si la respuesta no fue un exitosa (200), se crea una nueva instancia de error, lo que hace que la promesa sea rechaza y se lleve al "catch" de la promesa
            }
            return response.json(); // Si la respuesta es exitosa, se da por solucionada esta promesa y se pasa a la siguiente etapa en formato json
        })
        .then(posts => {
            displayPosts(posts); //este json que ahora es un array de objetos se pasa a la función "displayPosts" que se encarga de pintar los resultados en el DOM
        })
        .catch(error => {
            displayError(error); // Si la promesa falla, se pasa el error a una función que pinta el mensaje en el DOM
        });
};

const displayPosts = (posts) => {
    const postList = document.getElementById('post-list'); // Se toma el elemento del DOM con id 'post-list' el cual es un elemento tipo "ul"
    postList.innerHTML = ''; // Se limpia el contenido del elemento "ul"
    posts.forEach(post => { // Se itera por el array de objetos devuelto por el ".then" anterior
        const listItem = document.createElement('li'); // Se crea un elemento tipo "li"
        listItem.textContent = `Title: ${post.title}`; // Se le asigna el título del post al elemento "li" creado en el paso anterior
        postList.appendChild(listItem); // Se le aggrega el elemento "ul" padre que ya fue seleccionado, lo que hace que se renderice este elemento en el DOM
    });
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message'); // Se elige el elemento tipo div del DOM con id "error-message"
    errorMessage.textContent = `Error: ${error.message}`; // Al elemento seleccionado anteriormente se le inserta el mensaje de error como contenido de texto
};
```

### Ejecución

1. Añadir un botón en el HTML para iniciar la solicitud de la API.
2. Crear una función en JavaScript para consumir la API utilizando `fetch`.
3. Manejar las promesas y los posibles errores de la solicitud.
4. Mostrar los datos obtenidos de la API en la página.
5. Implementar métodos de depuración para el manejo de errores y validación.

### Análisis

Explica el código proporcionado línea por línea en el archivo `README.md` de tu repositorio. Asegúrate de describir cómo se aplican los conceptos de control de flujo, funciones de flecha, JSON, promesas y depuración.

## Punto 4: Ejercicio Independiente - Creando una Aplicación de Gestión de Productos con la API de Platzi

En este cuarto punto, crearás una aplicación que consuma datos de la API de Platzi Fake Store y muestre la información de productos de manera interactiva y visualmente atractiva. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- JSON
- Promesas
- Depuración

### Historia de Usuario

Como usuario, quiero una aplicación que me permita ver y gestionar productos de una tienda en línea, para explorar las opciones disponibles y tomar decisiones de compra informadas.

### Criterios de Aceptación

1. **Consumo de API**:
   - La aplicación debe consumir datos de la API de Platzi Fake Store (https://fakeapi.platzi.com/).
   - **Concepto de JavaScript aplicado**: Promesas, JSON.

2. **Visualización de Datos**:
   - Los datos obtenidos de la API deben visualizarse en la página de manera estructurada y atractiva. Puede usar una tabla, una lista o cualquier otro formato que consideres adecuado.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

3. **Interacción del Usuario**:
   - Utilizar funciones de flecha para definir manejadores de eventos y procesamiento de datos.
   - **Concepto de JavaScript aplicado**: Funciones de Flecha, Eventos en JavaScript.

4. **Filtrado y Búsqueda**:
   - Implementar funcionalidades de filtrado y búsqueda para que los usuarios puedan encontrar productos específicos.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, Control de Flujo.

5. **Manejo de Errores**:
   - Implementar manejo de errores para la solicitud de la API y mostrar mensajes de error adecuados al usuario.
   - **Concepto de JavaScript aplicado**: Promesas, Depuración.

## Punto 5: Ejercicio Independiente - Métodos de Array en JavaScript

En este quinto punto, explorarás y aplicarás diversos métodos de array en JavaScript. Durante el proceso, se evaluarán los siguientes temas:

- Control de Flujo
- Funciones de Flecha
- Métodos de Array (reduce, forEach, map, filter, find, some, every)

### Historia de Usuario

Como usuario, quiero una aplicación que me permita gestionar y analizar una lista de productos utilizando diversos métodos de array, para obtener información relevante y personalizada de manera eficiente.

### Interface de Producto

```javascript

const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

```

### Criterios de Aceptación

1. **Visualización de Productos**:
   - La aplicación debe mostrar una lista de productos en la página. Puedes interactuar con el DOM o con la consola del navegador.
   - **Concepto de JavaScript aplicado**: Manipulación del DOM, forEach.

2. **Calcular el Precio Total**:
   - La aplicación debe calcular y mostrar el precio total de todos los productos utilizando el método `reduce`.
   - **Concepto de JavaScript aplicado**: reduce.

3. **Filtrar Productos por Categoría**:
   - La aplicación debe permitir filtrar productos por categoría utilizando el método `filter`.
   - **Concepto de JavaScript aplicado**: filter.

4. **Buscar un Producto por Nombre**:
   - La aplicación debe permitir buscar un producto específico por su nombre utilizando el método `find`.
   - **Concepto de JavaScript aplicado**: find.

5. **Verificar Disponibilidad de Productos**:
   - La aplicación debe verificar si todos los productos están disponibles utilizando el método `every`.
   - **Concepto de JavaScript aplicado**: every.

6. **Obtener Nombres de Productos**:
   - La aplicación debe crear una lista con los nombres de todos los productos utilizando el método `map`.
   - **Concepto de JavaScript aplicado**: map.

7. **Depuración y Manejo de Errores**:
   - Implementar métodos de depuración para el manejo de errores y validación.
   - **Concepto de JavaScript aplicado**: Depuración, Manejo de Errores.