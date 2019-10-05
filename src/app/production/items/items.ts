
export interface Item {
    factory?: number;
    build?: { store: string, time: number };
    needs?: Array<{ item: string, count: number}>;
    value?: number;
}

export interface Items {
    [name: string]: Item;
}

export const items: Items = {
    'Metal': { value: 10, factory: 1 },
    'Wood': { value: 20, factory: 3 },
    'Plastic': { value: 25, factory: 9 },
    'Seeds': { value: 30, factory: 20 },
    'Minerals': { value: 40, factory: 30 },
    'Chemicals': { value: 60, factory: 120 },
    'Textiles': { value: 90, factory: 180 },
    'Sugar and Spices': { value: 110, factory: 240 },
    'Glass': { value: 120, factory: 300 },
    'Animal Feed': { value: 140, factory: 360 },
    'Electrical Components': { value: 160, factory: 420 },

    'Nails': { value: 80, build: { store: 'Building Supplies Shop', time: 5 }, needs: [{ item: 'Metal', count: 2 }] },
    'Planks': { value: 120, build: { store: 'Building Supplies Shop', time: 30 }, needs: [{ item: 'Wood', count: 2 }] },
    'Bricks': { value: 190, build: { store: 'Building Supplies Shop', time: 20 }, needs: [{ item: 'Minerals', count: 2 }] },
    'Cement': { value: 440, build: { store: 'Building Supplies Shop', time: 50 }, needs: [{ item: 'Minerals', count: 2 }, { item: 'Chemicals', count: 1 }] },
    'Glue': { value: 440, build: { store: 'Building Supplies Shop', time: 60 }, needs: [{ item: 'Plastic', count: 1 }, { item: 'Chemicals', count: 2 }] },
    'Paint': { value: 320, build: { store: 'Building Supplies Shop', time: 60 }, needs: [{ item: 'Metal', count: 2 }, { item: 'Minerals', count: 1 }, { item: 'Chemicals', count: 2 }] },

    'Hammer': { value: 90, build: { store: 'Hardware Store', time: 14 }, needs: [{ item: 'Metal', count: 1 }, { item: 'Wood', count: 1 }] },
    'Measuring Tape': { value: 110, build: { store: 'Hardware Store', time: 20 }, needs: [{ item: 'Metal', count: 1 }, { item: 'Plastic', count: 1 }] },
    'Shovel': { value: 150, build: { store: 'Hardware Store', time: 30 }, needs: [{ item: 'Metal', count: 1 }, { item: 'Wood', count: 1 }, { item: 'Plastic', count: 1 }] },
    'Cooking Utensils': { value: 250, build: { store: 'Hardware Store', time: 45 }, needs: [{ item: 'Metal', count: 2 }, { item: 'Wood', count: 2 }, { item: 'Plastic', count: 2 }] },
    'Ladder': { value: 420, build: { store: 'Hardware Store', time: 60 }, needs: [{ item: 'Metal', count: 2 }, { item: 'Planks', count: 2 }] },
    'Drill': { value: 590, build: { store: 'Hardware Store', time: 120 }, needs: [{ item: 'Metal', count: 2 }, { item: 'Plastic', count: 2 }, { item: 'Electrical Components', count: 1 }] },

    'Vegetables': { value: 160, build: { store: 'Farmer\'s Market', time: 20 }, needs: [{ item: 'Seeds', count: 2}] },
    'Flour Bag': { value: 570, build: { store: 'Farmer\'s Market', time: 30 }, needs: [{ item: 'Seeds', count: 2}, { item: 'Textiles', count: 2}] },
    'Fruit and Berries': { value: 730, build: { store: 'Farmer\'s Market', time: 90 }, needs: [{ item: 'Seeds', count: 2}, { item: 'Tree Saplings', count: 1}] },
    'Cream': { value: 440, build: { store: 'Farmer\'s Market', time: 75 }, needs: [{ item: 'Animal Feed', count: 1}] },
    'Corn': { value: 280, build: { store: 'Farmer\'s Market', time: 60 }, needs: [{ item: 'Minerals', count: 1}, { item: 'Seeds', count: 4}] },
    'Cheese': { value: 660, build: { store: 'Farmer\'s Market', time: 105 }, needs: [{ item: 'Animal Feed', count: 2}] },
    'Beef': { value: 860, build: { store: 'Farmer\'s Market', time: 150 }, needs: [{ item: 'Animal Feed', count: 3}] },

    'Chairs': { value: 300, build: { store: 'Furniture Store', time: 20 }, needs: [{ item: 'Wood', count: 2 }, { item: 'Nails', count: 1 }, { item: 'Hammer', count: 1 }]},
    'Tables': { value: 500, build: { store: 'Furniture Store', time: 30 }, needs: [{ item: 'Nails', count: 2 }, { item: 'Planks', count: 1 }, { item: 'Hammer', count: 1 }]},
    'Home Textiles': { value: 610, build: { store: 'Furniture Store', time: 75 }, needs: [{ item: 'Textiles', count: 2 }, { item: 'Measuring Tape', count: 1 }]},
    'Cupboard': { value: 900, build: { store: 'Furniture Store', time: 45 }, needs: [{ item: 'Glass', count: 2 }, { item: 'Planks', count: 2 }, { item: 'Paint', count: 1 }]},
    'Couch': { value: 1810, build: { store: 'Furniture Store', time: 150 }, needs: [{ item: 'Textiles', count: 3 }, { item: 'Glue', count: 1 }, { item: 'Drill', count: 1 }]},

    'Grass': { value: 310, build: { store: 'Gardening Supplies', time: 30 }, needs: [{ item: 'Seeds', count: 1}, { item: 'Shovel', count: 1}] },
    'Tree Saplings': { value: 420, build: { store: 'Gardening Supplies', time: 90 }, needs: [{ item: 'Seeds', count: 2}, { item: 'Shovel', count: 2}] },
    'Garden Furniture': { value: 820, build: { store: 'Gardening Supplies', time: 135 }, needs: [{ item: 'Plastic', count: 2}, { item: 'Textiles', count: 2}, { item: 'Planks', count: 2}] },
    'Fire Pit': { value: 1740, build: { store: 'Gardening Supplies', time: 240 }, needs: [{ item: 'Bricks', count: 2}, { item: 'Cement', count: 2}, { item: 'Shovel', count: 1}] },
    'Lawn Mower': { value: 840, build: { store: 'Gardening Supplies', time: 120 }, needs: [{ item: 'Metal', count: 3}, { item: 'Electrical Components', count: 1}, { item: 'Paint', count: 1}] },
    'Garden Gnomes': { value: 1600, build: { store: 'Gardening Supplies', time: 90 }, needs: [{ item: 'Cement', count: 2}, { item: 'Glue', count: 1}] },

    'Donuts': { value: 950, build: { store: 'Donut Shop', time: 45 }, needs: [{ item: 'Sugar and Spices', count: 1}, { item: 'Flour Bag', count: 1}] },
    'Green Smoothie': { value: 1150, build: { store: 'Donut Shop', time: 30 }, needs: [{ item: 'Vegetables', count: 1}, { item: 'Fruit and Berries', count: 1}] },
    'Bread Roll': { value: 1840, build: { store: 'Donut Shop', time: 60 }, needs: [{ item: 'Flour Bag', count: 2}, { item: 'Cream', count: 1}] },
    'Cherry Cheesecake': { value: 2240, build: { store: 'Donut Shop', time: 90 }, needs: [{ item: 'Flour Bag', count: 1}, { item: 'Fruit and Berries', count: 1}, { item: 'Cheese', count: 1}] },
    'Frozen Yogurt': { value: 1750, build: { store: 'Donut Shop', time: 240 }, needs: [{ item: 'Sugar and Spices', count: 1}, { item: 'Fruit and Berries', count: 1}, { item: 'Cream', count: 1}] },
    'Coffee': { value: 750, build: { store: 'Donut Shop', time: 60 }, needs: [{ item: 'Seeds', count: 2}, { item: 'Sugar and Spices', count: 1}, { item: 'Cream', count: 1}] },

    'Cap': { value: 600, build: { store: 'Fashion Store', time: 60 }, needs: [{ item: 'Textiles', count: 2}, { item: 'Measuring Tape', count: 1}] },
    'Shoes': { value: 980, build: { store: 'Fashion Store', time: 75 }, needs: [{ item: 'Plastic', count: 1}, { item: 'Textiles', count: 2}, { item: 'Glue', count: 1}] },
    'Watch': { value: 580, build: { store: 'Fashion Store', time: 90 }, needs: [{ item: 'Plastic', count: 2}, { item: 'Chemicals', count: 1}, { item: 'Glass', count: 1}] },
    'Business Suits': { value: 1170, build: { store: 'Fashion Store', time: 210 }, needs: [{ item: 'Textiles', count: 3}, { item: 'Glue', count: 1}, { item: 'Measuring Tape', count: 1}] },
    'Backpack': { value: 430, build: { store: 'Fashion Store', time: 150 }, needs: [{ item: 'Plastic', count: 2}, { item: 'Textiles', count: 2}, { item: 'Measuring Tape', count: 1}] },

    'Ice Cream Sandwich': { value: 2560, build: { store: 'Fast Food Restaurant', time: 14 }, needs: [{ item: 'Cream', count: 1}, { item: 'Bread Roll', count: 1}] },
    'Pizza': { value: 2560, build: { store: 'Fast Food Restaurant', time: 24 }, needs: [{ item: 'Flour Bag', count: 1}, { item: 'Cheese', count: 1}, { item: 'Beef', count: 1}] },
    'Burgers': { value: 3620, build: { store: 'Fast Food Restaurant', time: 35 }, needs: [{ item: 'Beef', count: 1}, { item: 'Bread Roll', count: 1}, { item: 'BBQ Grill', count: 1}] },
    'Cheese Fries': { value: 1050, build: { store: 'Fast Food Restaurant', time: 20 }, needs: [{ item: 'Vegetables', count: 1}, { item: 'Cheese', count: 1}] },
    'Lemonade Bottle': { value: 1690, build: { store: 'Fast Food Restaurant', time: 60 }, needs: [{ item: 'Sugar and Spices', count: 2}, { item: 'Glass', count: 2}, { item: 'Fruit and Berries', count: 1}] },
    'Popcorn': { value: 1250, build: { store: 'Fast Food Restaurant', time: 30 }, needs: [{ item: 'Corn', count: 2}, { item: 'Microwave Oven', count: 1}] },

    'BBQ Grill': { value: 530, build: { store: 'Home Appliances', time: 165 }, needs: [{ item: 'Metal', count: 3}, { item: 'Cooking Utensils', count: 1}] },
    'Refrigerator': { value: 1060, build: { store: 'Home Appliances', time: 210 }, needs: [{ item: 'Plastic', count: 2}, { item: 'Chemicals', count: 2}, { item: 'Electrical Components', count: 2}] },
    'Lighting System': { value: 890, build: { store: 'Home Appliances', time: 105 }, needs: [{ item: 'Chemicals', count: 1}, { item: 'Glass', count: 1}, { item: 'Electrical Components', count: 1}] },
    'TV': { value: 1280, build: { store: 'Home Appliances', time: 150 }, needs: [{ item: 'Plastic', count: 1}, { item: 'Glass', count: 1}, { item: 'Electrical Components', count: 2}] },
    'Microwave Oven': { value: 480, build: { store: 'Home Appliances', time: 120 }, needs: [{ item: 'Metal', count: 4}, { item: 'Glass', count: 1}, { item: 'Electrical Components', count: 1}] },
}
