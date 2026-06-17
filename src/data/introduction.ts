import type { Introduction, SurroundingSpot, Review } from '@/types';

export const introductions: Introduction[] = [
  {
    id: '1',
    title: '土楼历史渊源',
    content: '土楼是客家民系在长期迁徙过程中创造的独特建筑形式，始于宋元时期，明清时期达到鼎盛。这些圆形或方形的巨型建筑不仅是客家人的居所，更是他们聚族而居、抵御外敌、传承文化的象征。每一座土楼都承载着厚重的历史记忆，见证了客家民系的艰辛与辉煌。',
    images: [
      'https://picsum.photos/id/1018/750/500',
      'https://picsum.photos/id/1015/750/500'
    ],
    category: 'history'
  },
  {
    id: '2',
    title: '建筑艺术瑰宝',
    content: '土楼建筑以其独特的造型和精湛的工艺闻名于世。圆形土楼被誉为"东方古城堡"，外墙用夯土筑成，厚达1-2米，具有极佳的防御和保温功能。楼内结构巧妙，天井、水井、粮仓、祖堂一应俱全，体现了客家人"天人合一"的建筑理念。联合国教科文组织将其列入世界文化遗产名录，称其为"世界上独一无二的神话般的山村建筑模式"。',
    images: [
      'https://picsum.photos/id/1036/750/500',
      'https://picsum.photos/id/1039/750/500'
    ],
    category: 'architecture'
  },
  {
    id: '3',
    title: '客家文化传承',
    content: '客家人在土楼中创造了丰富多彩的民俗文化。从客家山歌、木偶戏到舞龙舞狮，从客家美食到传统手工艺，每一种文化形式都深深植根于这片土地。楼内的祖堂是族人祭祀祖先、议事决策的场所，体现了客家人尊祖敬宗、团结互助的传统美德。在这里，您可以亲身感受地道的客家风情，聆听动人的客家故事。',
    images: [
      'https://picsum.photos/id/1044/750/500',
      'https://picsum.photos/id/1018/750/500'
    ],
    category: 'culture'
  },
  {
    id: '4',
    title: '自然与人文交融',
    content: '土楼大多坐落于青山绿水之间，与自然环境完美融合。楼外是层层叠叠的梯田、郁郁葱葱的竹林，楼内是炊烟袅袅、鸡犬相闻的生活景象。清晨，云雾缭绕中的土楼如梦如幻；傍晚，夕阳映照下的夯土墙泛着金色光芒。这里远离城市喧嚣，是您放松身心、回归自然的理想之地。',
    images: [
      'https://picsum.photos/id/1015/750/500',
      'https://picsum.photos/id/1036/750/500'
    ],
    category: 'surrounding'
  }
];

export const surroundingSpots: SurroundingSpot[] = [
  {
    id: '1',
    name: '田螺坑土楼群',
    description: '由一座方形、三座圆形、一座椭圆形土楼组成，俗称"四菜一汤"，是土楼建筑的杰出代表。',
    image: 'https://picsum.photos/id/1018/300/200',
    distance: '3公里',
    duration: '约10分钟车程',
    ticketPrice: '90元'
  },
  {
    id: '2',
    name: '云水谣古镇',
    description: '百年老榕树、悠长古道、潺潺溪流，是电影《云水谣》的取景地，充满诗情画意。',
    image: 'https://picsum.photos/id/1015/300/200',
    distance: '5公里',
    duration: '约15分钟车程',
    ticketPrice: '75元'
  },
  {
    id: '3',
    name: '怀远楼',
    description: '保存最完好的双环圆形土楼，楼内有"斯是室"私塾，文化底蕴深厚。',
    image: 'https://picsum.photos/id/1036/300/200',
    distance: '2公里',
    duration: '约5分钟车程',
    ticketPrice: '50元'
  },
  {
    id: '4',
    name: '和贵楼',
    description: '建在沼泽地上的"天下第一奇楼"，历经200多年依然稳固如初。',
    image: 'https://picsum.photos/id/1039/300/200',
    distance: '2.5公里',
    duration: '约8分钟车程',
    ticketPrice: '50元'
  },
  {
    id: '5',
    name: '茶山观景台',
    description: '千亩茶园层层叠叠，是观赏日出、体验采茶的绝佳去处。',
    image: 'https://picsum.photos/id/1044/300/200',
    distance: '8公里',
    duration: '约20分钟车程',
    ticketPrice: '免费'
  },
  {
    id: '6',
    name: '客家古村落',
    description: '保存完好的客家古村落，石板路、三合院、古榕树，处处是乡愁。',
    image: 'https://picsum.photos/id/1018/300/200',
    distance: '6公里',
    duration: '约18分钟车程',
    ticketPrice: '40元'
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    orderId: 'ORD001',
    guestName: '张先生',
    avatar: 'https://picsum.photos/id/1005/100/100',
    rating: 5,
    content: '非常棒的入住体验！土楼的夜晚特别安静，能听到虫鸣声。房间干净整洁，早餐也很丰盛，都是当地特色。主人很热情，给我们介绍了很多土楼的历史文化。下次还会再来！',
    images: [
      'https://picsum.photos/id/1048/300/200',
      'https://picsum.photos/id/1040/300/200'
    ],
    createTime: '2026-06-10',
    reply: '感谢张先生的好评！我们会继续努力，为每一位客人带来最地道的土楼体验。期待您的再次光临！',
    replyTime: '2026-06-11'
  },
  {
    id: '2',
    orderId: 'ORD002',
    guestName: '李女士',
    avatar: 'https://picsum.photos/id/1012/100/100',
    rating: 5,
    content: '带孩子来体验客家文化，参加了采茶和制茶活动，孩子玩得特别开心，还学到了很多知识。土楼的建筑太壮观了，晚上看星星也特别美。强烈推荐！',
    images: [
      'https://picsum.photos/id/1031/300/200'
    ],
    createTime: '2026-06-08',
    reply: '很高兴孩子们喜欢这里的体验活动！我们会定期更新活动内容，欢迎常来看看。',
    replyTime: '2026-06-09'
  },
  {
    id: '3',
    orderId: 'ORD003',
    guestName: '王小姐',
    avatar: 'https://picsum.photos/id/1011/100/100',
    rating: 4,
    content: '整体体验很好，环境优美，空气清新。唯一的建议是房间的隔音可以再改善一下。客家菜味道很正宗，盐焗鸡和梅菜扣肉特别好吃！',
    images: [],
    createTime: '2026-06-05'
  },
  {
    id: '4',
    orderId: 'ORD004',
    guestName: '陈先生一家',
    avatar: 'https://picsum.photos/id/1027/100/100',
    rating: 5,
    content: '全家老小一起来的，住了三天两晚。老人喜欢土楼的历史感，孩子喜欢各种体验活动，我们年轻人则享受这里的慢生活。特别感谢管家阿芳的悉心照顾！',
    images: [
      'https://picsum.photos/id/1019/300/200',
      'https://picsum.photos/id/1029/300/200',
      'https://picsum.photos/id/1042/300/200'
    ],
    createTime: '2026-06-01',
    reply: '陈家大小的满意是我们最大的动力！阿芳说也特别喜欢你们一家，下次来记得提前告诉我们，给您留最好的房间。',
    replyTime: '2026-06-02'
  },
  {
    id: '5',
    orderId: 'ORD005',
    guestName: '摄影爱好者小刘',
    avatar: 'https://picsum.photos/id/1025/100/100',
    rating: 5,
    content: '作为摄影爱好者，这里简直是天堂！清晨的云雾、傍晚的夕阳、夜晚的星空，还有土楼内部独特的光影效果，拍出来的照片每张都像大片。强烈推荐给喜欢拍照的朋友！',
    images: [
      'https://picsum.photos/id/1015/300/200',
      'https://picsum.photos/id/1036/300/200'
    ],
    createTime: '2026-05-28'
  }
];
