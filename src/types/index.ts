export type Oomachi =
  | '下知'
  | '五台山'
  | '高須'
  | '大津'
  | '介良'
  | '三里'
  | '初月'
  | '鏡'
  | '朝倉'
  | '旭街'
  | '鴨田'
  | '潮江'
  | '長浜'
  | '御畳瀬'
  | '浦戸'
  | '春野'
  | '秦'
  | '土佐山'
  | '布師田'
  | '一宮'
  | '南街'
  | '北街'
  | '江ノ口'
  | '上街'
  | '高知街'
  | '小高坂'

export type Town = {
  name: string
  reading: string
  oomachi: Oomachi
}

export type Answer = {
  reading: string
  oomachi: Oomachi
}

export type GradeResult = {
  reading: boolean
  oomachi: boolean
}
