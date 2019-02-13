import styled from 'styled-components'

const GitHubLink = styled.a`
  display: flex;
  justify-content: flex-end;
  height: 4em;
  margin-right: 95px;

  &::before {
    position: absolute;
    top: 0;
    right: 95px;
    content: '';
    background: 0 0;
    width: 6px;
    height: 6px;
    color: #333;
    box-shadow: 24px 6px, 78px 6px, 24px 12px, 30px 12px, 72px 12px, 78px 12px,
      24px 18px, 30px 18px, 36px 18px, 42px 18px, 48px 18px, 54px 18px,
      60px 18px, 66px 18px, 72px 18px, 78px 18px, 18px 24px, 24px 24px,
      30px 24px, 36px 24px, 42px 24px, 48px 24px, 54px 24px, 60px 24px,
      66px 24px, 72px 24px, 78px 24px, 84px 24px, 18px 30px, 24px 30px,
      30px 30px, 36px 30px, 42px 30px, 48px 30px, 54px 30px, 60px 30px,
      66px 30px, 72px 30px, 78px 30px, 84px 30px, 18px 36px, 24px 36px,
      30px 36px, 36px 36px #ffdec4, 42px 36px #ffdec4, 48px 36px #ffdec4,
      54px 36px #ffdec4, 60px 36px #ffdec4, 66px 36px #ffdec4, 72px 36px,
      78px 36px, 84px 36px, 18px 42px, 24px 42px, 30px 42px #ffdec4,
      36px 42px #cb7066, 42px 42px #ffdec4, 48px 42px #ffdec4, 54px 42px #ffdec4,
      60px 42px #ffdec4, 66px 42px #cb7066, 72px 42px #ffdec4, 78px 42px,
      84px 42px, 18px 48px, 24px 48px, 30px 48px #ffdec4, 36px 48px #cb7066,
      42px 48px #ffdec4, 48px 48px #ffdec4, 54px 48px #ffdec4, 60px 48px #ffdec4,
      66px 48px #cb7066, 72px 48px #ffdec4, 78px 48px, 84px 48px, 24px 54px,
      30px 54px, 36px 54px #ffdec4, 42px 54px #ffdec4, 48px 54px #cb7066,
      54px 54px #cb7066, 60px 54px #ffdec4, 66px 54px #ffdec4, 72px 54px,
      78px 54px, 6px 60px, 12px 60px, 42px 60px, 48px 60px, 54px 60px, 60px 60px,
      18px 66px, 24px 66px, 36px 66px, 42px 66px, 48px 66px, 54px 66px,
      60px 66px, 66px 66px, 24px 72px, 30px 72px, 36px 72px, 42px 72px,
      48px 72px, 54px 72px, 60px 72px, 66px 72px, 36px 78px, 48px 78px,
      54px 78px, 66px 78px, 36px 84px, 48px 84px, 54px 84px, 66px 84px,
      30px 90px, 42px 90px, 60px 90px, 72px 90px;
  }
`

export default GitHubLink
