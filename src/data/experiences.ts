import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: '1',
    title: '客家山歌传唱',
    description: '跟随客家山歌传承人学习地道的客家山歌，了解山歌背后的故事和文化内涵。在土楼的天井里，伴着悠扬的歌声，感受客家文化的独特魅力。',
    image: 'https://picsum.photos/id/1044/750/500',
    category: 'folk',
    duration: '1.5小时',
    price: 68,
    maxParticipants: 20,
    availableDates: ['2026-06-18', '2026-06-20', '2026-06-22', '2026-06-25']
  },
  {
    id: '2',
    title: '客家美食制作',
    description: '亲手制作客家传统美食：酿豆腐、梅菜扣肉、盐焗鸡。从选材到烹饪，由当地大厨手把手教学，做完还可以品尝自己的劳动成果哦！',
    image: 'https://picsum.photos/id/292/750/500',
    category: 'folk',
    duration: '2小时',
    price: 128,
    maxParticipants: 15,
    availableDates: ['2026-06-17', '2026-06-19', '2026-06-21', '2026-06-23', '2026-06-24']
  },
  {
    id: '3',
    title: '采茶体验',
    description: '清晨时分，背上竹篓，在千亩茶园中体验采茶的乐趣。茶农会教您如何识别好茶、如何正确采摘，还能了解茶叶从采摘到成品的全过程。',
    image: 'https://picsum.photos/id/1044/750/500',
    category: 'tea',
    duration: '2小时',
    price: 88,
    maxParticipants: 25,
    availableDates: ['2026-06-17', '2026-06-18', '2026-06-19', '2026-06-20', '2026-06-21']
  },
  {
    id: '4',
    title: '手工制茶',
    description: '体验传统手工制茶工艺：摊青、杀青、揉捻、烘干。在老茶师的指导下，亲手制作一盒属于自己的茶叶，还可以带走作为纪念。',
    image: 'https://picsum.photos/id/1015/750/500',
    category: 'tea',
    duration: '3小时',
    price: 168,
    maxParticipants: 12,
    availableDates: ['2026-06-18', '2026-06-20', '2026-06-22', '2026-06-25']
  },
  {
    id: '5',
    title: '土楼建筑研学',
    description: '由土楼研究专家带领，深入了解土楼的建筑原理、历史背景和文化价值。从夯土工艺到防御设计，全方位解读这一世界文化遗产的奥秘。',
    image: 'https://picsum.photos/id/1036/750/500',
    category: 'education',
    duration: '2.5小时',
    price: 98,
    maxParticipants: 30,
    availableDates: ['2026-06-17', '2026-06-19', '2026-06-21', '2026-06-23']
  },
  {
    id: '6',
    title: '客家文化讲堂',
    description: '聆听客家历史文化讲座，了解客家人五次大迁徙的历史，学习客家方言、客家民俗，加深对客家文化的理解。',
    image: 'https://picsum.photos/id/1039/750/500',
    category: 'education',
    duration: '1.5小时',
    price: 58,
    maxParticipants: 40,
    availableDates: ['2026-06-18', '2026-06-20', '2026-06-22', '2026-06-24']
  },
  {
    id: '7',
    title: '端午节客家龙舟会',
    description: '体验客家端午节习俗：观看龙舟比赛、包粽子、点雄黄酒、佩香囊。感受最地道的客家节日氛围。',
    image: 'https://picsum.photos/id/1018/750/500',
    category: 'festival',
    duration: '4小时',
    price: 188,
    maxParticipants: 50,
    availableDates: ['2026-06-19']
  },
  {
    id: '8',
    title: '客家火把节',
    description: '夜幕降临时，点燃火把，绕着土楼游行，伴随着客家山歌和舞龙表演，体验这一古老而神秘的客家传统节日。',
    image: 'https://picsum.photos/id/1015/750/500',
    category: 'festival',
    duration: '3小时',
    price: 128,
    maxParticipants: 100,
    availableDates: ['2026-06-25', '2026-07-15']
  }
];

export const categoryNames = {
  folk: '客家民俗',
  tea: '采茶制茶',
  education: '研学接待',
  festival: '节庆活动'
};
