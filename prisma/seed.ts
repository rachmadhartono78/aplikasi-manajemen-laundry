import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Seed Services
  const services = [
    {
      name: 'Cuci + Setrika (Kiloan)',
      price: 6000,
      unit: 'kg',
      description: 'Layanan cuci bersih dan setrika rapi.',
    },
    {
      name: 'Setrika Saja (Kiloan)',
      price: 4000,
      unit: 'kg',
      description: 'Hanya setrika rapi.',
    },
    {
      name: 'Cuci Saja (Kiloan)',
      price: 4000,
      unit: 'kg',
      description: 'Hanya cuci bersih tanpa setrika.',
    },
    {
      name: 'Cuci + Setrika (Express)',
      price: 10000,
      unit: 'kg',
      description: 'Layanan kilat cuci dan setrika (6 jam).',
    },
    {
      name: 'Cuci Kering / Dry Clean (Satuan)',
      price: 15000,
      unit: 'pcs',
      description: 'Layanan cuci kering untuk pakaian sensitif (Jas, Kebaya, dll).',
    },
    {
      name: 'Cuci Bedcover (Satuan)',
      price: 35000,
      unit: 'pcs',
      description: 'Layanan cuci bedcover besar.',
    },
  ]

  for (const service of services) {
    const existing = await prisma.service.findFirst({ where: { name: service.name } });
    if (!existing) {
      await prisma.service.create({ data: service });
    } else {
      await prisma.service.update({ where: { id: existing.id }, data: service });
    }
  }

  // 2. Seed Customers for CRM
  const customers = [
    {
      name: 'Budi Santoso',
      phone: '08123456789',
      address: 'Jl. Merdeka No. 12, Jakarta',
      loyaltyPoints: 120,
    },
    {
      name: 'Siti Aminah',
      phone: '08567891234',
      address: 'Perum Harapan Indah Blok B3, Bekasi',
      loyaltyPoints: 45,
    },
    {
      name: 'Andi Wijaya',
      phone: '08781234567',
      address: 'Apartemen Green Park Lt. 5',
      loyaltyPoints: 10,
    }
  ]

  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { phone: customer.phone },
      update: customer,
      create: customer,
    })
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
