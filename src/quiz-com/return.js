import React from 'react'

const Res = (props) => {
  return (
    <div>
      <h2>You scored {props.score} correct  answer out of {props.length}</h2>
    </div>
  )
}

export default Res