const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  // 标题
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // 正文
  content: {
    type: String,
    required: true,
    trim: true
  },
  // 封面
  cover: {
    type: String,
    trim: true
  },
  // 创建时间
  createTime: {
    type: Number,
    default: new Date().getTime()
  },
  // 更新时间
  updateTime: {
    type: Number,
    default: null
  },
  // 文章所属分类 类别Id
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  // 文章所属标签 标签Id
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  // 阅读次数
  views: {
    type: Number,
    default: 0
  },
  // 点赞用户 用户Id
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  // 作者ID
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

function populate() {
  this.populate({
    path: 'author',
    select: ['_id', 'name', 'avatar']
  }).populate({
    path: 'likes',
    select: ['_id', 'name']
  }).populate({
    path: 'tags',
    select: ['_id', 'name']
  }).populate({
    path: 'category',
    select: ['_id', 'name']
  })
}

blogSchema.pre('find', populate)
blogSchema.pre('findOne', populate)

module.exports = mongoose.model('Blog', blogSchema)