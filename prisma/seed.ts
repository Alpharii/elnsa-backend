import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Hapus semua data sebelum seeding (opsional)
  await prisma.favoriteCharacter.deleteMany({});
  await prisma.hobby.deleteMany({});
  await prisma.person.deleteMany({});
  await prisma.account.deleteMany({});

  console.log('Database cleared.');

  // Seed Accounts
  const accounts = await prisma.account.createMany({
    data: [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
    ],
  });
  console.log(`Seeded ${accounts.count} accounts.`);

  // Seed Persons
  const persons = await prisma.person.createMany({
    data: [
      {
        name: 'John Doe',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        picture: 'https://example.com/john.jpg',
      },
      {
        name: 'Jane Smith',
        phone: '+0987654321',
        email: 'jane.smith@example.com',
        picture: 'https://example.com/jane.jpg',
      },
    ],
  });
  console.log(`Seeded ${persons.count} persons.`);

  // Ambil ID dari Persons untuk digunakan di relasi
  const [john, jane] = await prisma.person.findMany();

  // Seed Hobbies
  const hobbies = await prisma.hobby.createMany({
    data: [
      { name: 'Reading', personId: john.id },
      { name: 'Gaming', personId: john.id },
      { name: 'Cooking', personId: jane.id },
      { name: 'Traveling', personId: jane.id },
    ],
  });
  console.log(`Seeded ${hobbies.count} hobbies.`);

  // Seed Favorite Characters
  const favoriteCharacters = await prisma.favoriteCharacter.createMany({
    data: [
      { origin: 'DC', name: 'Batman', personId: john.id },
      { origin: 'Marvel', name: 'Iron Man', personId: john.id },
      { origin: 'DC', name: 'Wonder Woman', personId: jane.id },
      { origin: 'Marvel', name: 'Spider-Man', personId: jane.id },
    ],
  });
  console.log(`Seeded ${favoriteCharacters.count} favorite characters.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
