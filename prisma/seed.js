const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const services = [
    { name: 'Cuci + Setrika (Kiloan)', price: 6000, unit: 'kg', description: 'Layanan cuci bersih dan setrika rapi.' },
    { name: 'Setrika Saja (Kiloan)', price: 4000, unit: 'kg', description: 'Hanya setrika rapi.' },
    { name: 'Cuci Saja (Kiloan)', price: 4000, unit: 'kg', description: 'Hanya cuci bersih tanpa setrika.' },
    { name: 'Cuci + Setrika (Express)', price: 10000, unit: 'kg', description: 'Layanan kilat cuci dan setrika (6 jam).' },
    { name: 'Cuci Kering / Dry Clean (Satuan)', price: 15000, unit: 'pcs', description: 'Jas, Kebaya, dll.' },
    { name: 'Cuci Bedcover (Satuan)', price: 35000, unit: 'pcs', description: 'Bedcover besar.' },
  ];

  for (const service of services) {
    const existing = await prisma.service.findFirst({ where: { name: service.name } });
    if (!existing) {
      await prisma.service.create({ data: service });
      console.log(`Created service: ${service.name}`);
    } else {
      console.log(`Service already exists: ${service.name}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
