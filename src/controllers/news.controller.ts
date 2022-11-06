import { NewsService } from '../services/news.service'
import type { TopicsMetaResponse } from '../interfaces/topics'
import type { NewsItemResponse } from '../interfaces/news'
import type { CustomResponse } from '../interfaces/response'
import type { NextFunction, Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RSS = require('rss')

const feed = new RSS({
  title: 'Inshorts RSS',
  description: 'description',
  feed_url: 'http://example.com/rss.xml',
  site_url: 'http://example.com',
  image_url: 'http://example.com/icon.png',
  docs: 'http://example.com/rss/docs.html',
  managingEditor: 'Psybot',
  webMaster: 'Psyphi',
  copyright: '2022 Psyphi',
  language: 'en',
  categories: ['Category 1', 'Category 2', 'Category 3'],
  pubDate: new Date().toDateString,
  ttl: '60',
})
export class NewsController {
  private newsService: NewsService

  constructor() {
    this.newsService = new NewsService()
  }

  public allNews = async (
    req: Request,
    res: Response<CustomResponse<NewsItemResponse[]>>,
    next: NextFunction
  ) => {
    try {
      const { offset, limit } = req.query

      const response = await this.newsService.getAllNews(Number(offset), Number(limit))

      res.status(200).json({ status: 'SUCCESS', message: null, data: response })
    } catch (error) {
      next(error)
    }
  }

  public topNews = async (
    req: Request,
    res: Response<CustomResponse<NewsItemResponse[]>>,
    next: NextFunction
  ) => {
    try {
      const { offset, limit } = req.query

      const response = await this.newsService.getTopNews(Number(offset), Number(limit))

      res.status(200).json({ status: 'SUCCESS', message: null, data: response })
    } catch (error) {
      next(error)
    }
  }

  public trendingNews = async (
    req: Request,
    res: Response<CustomResponse<NewsItemResponse[]>>,
    next: NextFunction
  ) => {
    try {
      const { offset, limit } = req.query

      const response = await this.newsService.getTrendingNews(Number(offset), Number(limit))

      res.status(200).json({ status: 'SUCCESS', message: null, data: response })
    } catch (error) {
      next(error)
    }
  }

  public trendingTopics = async (
    req: Request,
    res: Response<CustomResponse<TopicsMetaResponse[]>>,
    next: NextFunction
  ) => {
    try {
      const response = await this.newsService.getTrendingTopics()

      res.status(200).json({ status: 'SUCCESS', message: null, data: response })
    } catch (error) {
      next(error)
    }
  }

  public topic = async (
    req: Request,
    res: Response<CustomResponse<NewsItemResponse[]>>,
    next: NextFunction
  ) => {
    try {
      const { topic } = req.params
      const { offset, limit } = req.query

      const response = await this.newsService.getTopicNews(topic, Number(offset), Number(limit))

      res.status(200).json({ status: 'SUCCESS', message: null, data: response })
    } catch (error) {
      next(error)
    }
  }

  public searchNews = async (
    req: Request,
    res: Response<CustomResponse<NewsItemResponse[]>>,
    next: NextFunction
  ) => {
    try {
      const { offset, limit, query } = req.query

      const response = await this.newsService.getSearchedNews(
        query as string,
        Number(offset),
        Number(limit)
      )

      res.status(200).json({ status: 'SUCCESS', message: null, data: response })
    } catch (error) {
      next(error)
    }
  }

  public rss = async (
    req: Request,
    res: Response<CustomResponse<NewsItemResponse[]>>,
    next: NextFunction
  ) => {
    try {
      const { offset, limit } = req.query

      const response = await this.newsService.getAllNews(Number(offset), Number(limit))

      // res.status(200).json({ status: 'SUCCESS', message: null, data: response })
      response.articles.forEach((article) => {
        feed.item({
          title: article.title,
          description: article.content,
        })
      })
      res.set('Content-Type', 'text/xml')
      res.status(200).send(feed.xml())
    } catch (error) {
      next(error)
    }
  }
}
