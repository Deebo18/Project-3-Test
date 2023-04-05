const db = require('./connection');
const { User, Animal, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Dog' },
    { name: 'Cat' },
    { name: 'Rabbit' },
    { name: 'Birds' },
    { name: 'Horse' }
  ]);

  console.log('categories seeded');

  await Animal.deleteMany();

  const animals = await Animal.insertMany([
    {
      name: 'Fish',
      type: 'Dog',
      breed: 'Mut',
      category: categories[0]._id,
      gender: 'female',
      age: 1,
      location: 'Santa Clarita',
      description: 'Test',
      isAdopted: false
    },
    {
      name: 'Brutus',
      type: 'Dog',
      breed: 'Bulldog',
      category: categories[0]._id,
      gender: 'Male',
      age: 2,
      location: 'Irvine',
      description: 'Test',
      isAdopted: false    },
    {
      name: 'Morty',
      type: 'Cat',
      breed: 'Maine Coon',
      category: categories[1]._id,
      gender: 'female',
      age: 4,
      location: 'Los Angeles',
      description: 'Test',
      isAdopted: false    }
    ]);

    console.log('pets seeded');

    await User.deleteMany();

  // for (const animal of animals) {
  //   const response = await fetch(`${apiUrl}/animals`, {
  //     method: 'POST',
  //     headers: {
  //       'Api-Key': apiKey,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(animal)
  //   });

    // if (!response.ok) {
    //   throw new Error(`Failed to seed animal ${animal.name}: ${response.statusText}`);
    // }

  //   const data = await response.json();

  //   console.log(`Animal ${data.name} seeded successfully`);
  // }

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    Favorite: [
      {
        animals: [animals[0]._id, animals[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});