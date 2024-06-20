import React, {useState, useEffect} from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Rss = (props) => {

  const [urls, saveurls] = useState([])
  const [feed, setFeed] = useState([])

  fetchurl = () => {
    Meteor.call('rss.urls.save', (err, res) => {
      if(err) { return console.error(err) }
      if (JSON.stringify(res) != JSON.stringify(urls)) {
        saveurls(res)
      }
    })

}

fetchfeed = () => {
  urls?.forEach(url => {
    Meteor.call('rss.load', url, (err, res) => {
      if(err) { return console.error(err) }
      if (JSON.stringify(res) != JSON.stringify(feed)) {
        setFeed(res)
      }
    } 
    )
  })
}

  useEffect(() => {
    fetchurl()
  }, [])

  useEffect(() => {
    fetchfeed()
  }, [urls])




  return (
    <>
  
    <section id={'rss-options'}>
      <form id={'rss-form'}>
        <input id={'rss-input'} type='url' placeholder={'Enter RSS URL'} />
        <span className={"class-button-link"} id={'rss-button'} value="Add" onClick={(e) => {
          let url = document.getElementById('rss-input').value
          // let regexurl = /^(http:\/\/www.|https:\/\/www.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/  
          var regexp = /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm
          if(!regexp.test(url))
           { return console.error('Invalid URL') }
          Meteor.call('rss.urls.save', document.getElementById('rss-input').value, null, null, (err, res) => {
            if(err) { return console.log(err) }
              saveurls(res)
            })
        }} >Add</span>
      </form>

      <div id={"rss-urls"}>
      {urls.map((url, i) => {
        return <div className={"rss-url"} key={`${url._id}-${i}`}>
          <span>{url.url}</span>
          <span className={"class-button-link"} onClick={()=> {
            Meteor.call('rss.urls.save', null, url._id, null, (e, r) => {
              if(e) { return console.log(e) }
              saveurls(r)
            })
          }}>Remove</span>

        </div>
      })}
      </div>
      </section>

      <section>
        <div className={'rss-content'}>
          {urls.map((url, i) => {
            return (
              <article className="rss-feed" key={`${i}-article-${url._id}`}>
              <>
              <h1><b>{url.url}</b></h1>
              {url.feed?.sort((a, b) => {
                return new Date(b.pubDate._text) - new Date(a.pubDate._text)
              }).map((article, i) => {
                let title = article?.title?._cdata? article?.title?._cdata : article?.title?._text
                return (
                  <div className={"rss-article"} key={`${i}-item-${url._id}`}>
                    <h2><a target="_blank" href={article?.link?._text}>{title}</a></h2>
                    <Visible url={url.url} guid={article?.guid?._text} visibility={article?.visibility} />
                  </div>
                )
            })}
              </>
              </article>
            )
          })} </div>
      </section>



    </>
  )
}

export const Visible = ({url, guid, visibility}) => {
const [visible, setVisible] = useState(visibility)


  return (
    <>
    
      <span className={'class-button-link'} onClick={() => {
        Meteor.call('rss.feed.visibility', url, guid, visible, (err, res) => {
          if(err) { return console.log(err) }
          setVisible(!visible)
        })
      }
      }>{visible?<VisibilityIcon  />:<VisibilityOffIcon color={"disabled"} />}</span>

    
    </>
  )
}
