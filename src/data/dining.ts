import type { DiningItem } from '@/types';

export const diningItems: DiningItem[] = [
  {
    id: '1',
    name: '客家盐焗鸡',
    description: '选用当地散养土鸡，采用传统盐焗工艺制作，皮脆肉嫩，鲜香扑鼻，是客家菜的代表作。',
    image: 'https://picsum.photos/id/326/300/200',
    price: 88,
    category: 'dinner',
    isRecommended: true
  },
  {
    id: '2',
    name: '梅菜扣肉',
    description: '精选五花肉配以客家梅菜，肥而不腻，入口即化，咸香适中，是客家人逢年过节的必备菜肴。',
    image: 'https://picsum.photos/id/570/300/200',
    price: 68,
    category: 'dinner',
    isRecommended: true
  },
  {
    id: '3',
    name: '客家酿豆腐',
    description: '鲜嫩的豆腐嵌入肉馅，煎至金黄，再配以骨头汤慢炖，口感丰富，营养美味。',
    image: 'https://picsum.photos/id/401/300/200',
    price: 48,
    category: 'dinner',
    isRecommended: true
  },
  {
    id: '4',
    name: '土楼米粉',
    description: '以优质大米为原料，手工制作，配以猪骨高汤和新鲜食材，爽滑可口，早餐首选。',
    image: 'https://picsum.photos/id/292/300/200',
    price: 25,
    category: 'breakfast',
    isRecommended: true
  },
  {
    id: '5',
    name: '客家腌面',
    description: '客家特色早餐，面条劲道，配以猪油、蒜蓉、葱花，香气四溢，回味无穷。',
    image: 'https://picsum.photos/id/431/300/200',
    price: 18,
    category: 'breakfast',
    isRecommended: false
  },
  {
    id: '6',
    name: '三及第汤',
    description: '选用猪肝、猪肠、瘦肉，配以枸杞叶，汤鲜味美，营养丰富，是梅州人早餐的标配。',
    image: 'https://picsum.photos/id/580/300/200',
    price: 22,
    category: 'breakfast',
    isRecommended: false
  },
  {
    id: '7',
    name: '客家炒大肠',
    description: '选用新鲜大肠，配以酸菜、辣椒爆炒，酸辣开胃，口感爽脆，是下饭神器。',
    image: 'https://picsum.photos/id/625/300/200',
    price: 52,
    category: 'lunch',
    isRecommended: false
  },
  {
    id: '8',
    name: '苦笋煲',
    description: '客家山区特色，苦笋与五花肉、咸菜同煲，苦中带甘，清热解毒，是夏季佳肴。',
    image: 'https://picsum.photos/id/835/300/200',
    price: 58,
    category: 'lunch',
    isRecommended: false
  },
  {
    id: '9',
    name: '蒸水蛋',
    description: '选用农家土鸡蛋，蒸制而成，嫩滑如丝，老少皆宜。',
    image: 'https://picsum.photos/id/1080/300/200',
    price: 18,
    category: 'lunch',
    isRecommended: false
  },
  {
    id: '10',
    name: '客家艾粄',
    description: '用艾草汁和糯米粉制作，内包花生芝麻馅，香甜软糯，带有艾草的清香，是客家传统小吃。',
    image: 'https://picsum.photos/id/312/300/200',
    price: 15,
    category: 'snack',
    isRecommended: true
  },
  {
    id: '11',
    name: '算盘子',
    description: '用木薯粉制作的客家特色小吃，形似算盘子，配以香菇、肉末、虾仁炒制，Q弹可口。',
    image: 'https://picsum.photos/id/326/300/200',
    price: 28,
    category: 'snack',
    isRecommended: false
  },
  {
    id: '12',
    name: '客家娘酒',
    description: '客家传统糯米酒，香甜醇厚，营养丰富，有补气养血之功效，是客家人待客的上品。',
    image: 'https://picsum.photos/id/570/300/200',
    price: 38,
    category: 'snack',
    isRecommended: true
  }
];

export const categoryNames = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '特色小吃'
};

export const diningTimes = {
  breakfast: ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30'],
  lunch: ['11:00', '11:30', '12:00', '12:30', '13:00'],
  dinner: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00']
};
