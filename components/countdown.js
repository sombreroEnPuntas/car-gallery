// @flow

import React from 'react'

type PropsT = {|
  +initialTime?: number,
|}

type StateT = {|
  time: number,
|}

export class Countdown extends React.Component<PropsT, StateT> {
  constructor(props: PropsT) {
    super(props)
    this.state = { time: props.initialTime || 3 }
  }

  timerID: IntervalID

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState(prevState => ({
      time: prevState.time - 1,
    }))
  }

  render() {
    const { time } = this.state
    return <p>{`Retry in: ${time}`}</p>
  }
}

export default Countdown
