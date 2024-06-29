import { seedAllBuilding } from "./seed.js";

const seedDatabase = async () => {
    await seedAllBuilding()
}

export default seedDatabase;