import './Feed.css';
import React, { useState, useRef, useEffect} from "react";
import Waterfall from "waterfalljs-layout/react";
  
  export default function Feed( {posts, onTogglePost} ) {
    const postReverse = [...posts].reverse();
    const [images, setImages] = useState(postReverse);
    
    // only take the first image of the post in demo
    const ulMaxHRef = useRef(0);
  
    const handleSearchImage = async () => {
      const arr = [];

      // # TODO Pagination
      // const [count, setCount] = useState(0); 
      // const totalCount = posts.length - 1 - count;
      // if(totalCount > count + 9) {
      //   const currentReadCount = count + 9;
      //   for(let i = currentReadCount; i <= currentReadCount+9; i++) {
      //     const imgSrc = posts[i];
      //     arr.push(imgSrc);
      //   }
      //   setCount(preCount => preCount+9);
      // } else {
      //   for(let i = count; i <= totalCount; i++) {
      //     const imgSrc = posts[i];
      //     arr.push(imgSrc);
      //   }
      //   setCount(preCount => preCount+totalCount);
      // }
      // setImages((prev) => [...prev, ...arr]);

    };

    useEffect(
      () => {
        setImages(postReverse)
      },
      [posts] // Only run on initial render
    );

    return (
      <div className='feeds__container'
        onScroll={(e) => {
          const scrollH = e.target.scrollTop;
          // 700(decided) scrollTop + height + adjustment > ulMaxHRef.current
          if (scrollH + 700 > ulMaxHRef.current) {
            console.log("Scroll to bottom, automatically load more");
          }
        }}
      >
        <Waterfall
          mode="grid"
          el="#react-waterfall-grid-comps"
          columnWidth={236}
          columnCount={0}
          columnGap={24}
          rowGap={24}
          customStyle={''}
          onChangeUlMaxH={(h) => (ulMaxHRef.current = h)}
        >
          {images.map((item, index) => {
            return (
              <li key={index} onClick={() => onTogglePost(item)}>
                <div className='feed-item'>
                  <img className='feed-img' src={item.image[0]} alt="" />
                  <div className='feed-info'>
                    {item.title}
                    <div className='feed-user_info'>
                        <img src="https://i.pravatar.cc/50" className="feed-user_avatar" alt="User Avatar"/>
                        <h2 className="feed-username">{item.username}</h2>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </Waterfall>
        <div style={{ textAlign: "center" }}>
          <button className='loadbtn'
            onClick={() => handleSearchImage()}
            style={{ margin: "30px auto" }}
          >
            LOAD MORE
          </button>
        </div>
      </div>
    );
  }

