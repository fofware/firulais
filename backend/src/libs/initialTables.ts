import roles from "../models/roles";
import tags from "../models/tags";

export const createRoles = async () => {
  try {
    const count = await roles.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new roles({name: "user"}).save(),
      new roles({name: 'cliente'}).save(),
      new roles({name: 'revendedor'}).save(),
      new roles({name: "empleado"}),
      new roles({name: "admin"}).save()
    ])
    console.log(values);
  } catch (error) {
    console.log(error);
  }
}

export const createTags = async () => {
  try {
    //await tags.deleteMany({});
    const count = await tags.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new tags({name: "alimento"}).save(),
      new tags({name: 'balanceado'}).save(),
      new tags({name: 'humedo'}).save(),
      new tags({name: 'húmedo'}).save(),
      new tags({name: 'perro'}).save(),
      new tags({name: "cachorro"}).save(),
      new tags({name: "gatito"}).save(),
      new tags({name: "kitten"}).save(),
      new tags({name: "puppy"}).save(),
      new tags({name: "adulto"}).save(),
      new tags({name: "senior"}).save(),
      new tags({name: "cerdo"}).save(),
      new tags({name: "conejo"}).save(),
      new tags({name: "ave"}).save(),
      new tags({name: "semilla"}).save(),
      new tags({name: "sanitario"}).save(),
      new tags({name: "accesrio"}).save(),
      new tags({name: "juguete"}).save()
    ])
    console.log(values);
  } catch (error) {
    console.log(error);
  }
}

export const initTables = async () => {
  const values = await Promise.all([
    createTags(),
    createRoles()
  ])
}