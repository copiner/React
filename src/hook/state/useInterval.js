import React, { useState, useEffect, useRef } from "react";

export function useInterval(callback, delay){
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if(delay !== null){
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
        console.log("return clearInterval")
      };
    }
  }, [delay]);

}
