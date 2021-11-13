import React, { useState, useEffect } from 'react';
import apiRoutes from '../../apiRoutes.js';


function News(props) {
 const [news, setNews] = useState([]);
 const [stockNews, setStockNews] = useState([])


  useEffect(()=> {
    apiRoutes.fetchGeneralNews()
    .then((news) => {
      setNews(news.data.articles.slice(0,4));
    })
  }, []);


  useEffect(()=> {
    apiRoutes.fetchStockNews(props.currentStock.name)
    .then((news) => {
      setStockNews(news.data.articles.slice(0,4));
    })
    }, [props.currentStock]);


  const newsSet = props.buyView? stockNews: news ;
  const renderNews=()=> {
      return (
        <ul className='general-news-list'>
            {newsSet.map((article, i) => {
                return (
                  <li className='news-article' key={`article-${i}`}>
                      <div>
                          <a href={article.url}>{article.title}</a>
                          <p>{article.description}</p>
                      </div>
                      <img src={article.urlToImage}/>
                  </li>
                )
            })}
        </ul>
      );
  //   } else {
  //     return (
  //     <ul className='general-news-list'>
  //         {news.map((article, i) => {
  //             return (
  //               <li className='news-article' key={`article-${i}`}>
  //                   <div>
  //                       <a href={article.url}>{article.title}</a>
  //                       <p>{article.description}</p>
  //                   </div>
  //                   <img src={article.urlToImage}/>
  //               </li>
  //             )
  //         })}
  //     </ul>
  //   );
  // }
}

  return (
      <div className='news-div'>
          <h2>Recent News</h2>
          <hr/>
          {renderNews()}
      </div>
  );
}

export default News;



