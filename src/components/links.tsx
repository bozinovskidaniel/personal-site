import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCamera, faFilePdf, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FunctionComponent, memo } from 'react'

import { Centered } from '@/components/centered'

const links = [
  {
    icon: faGithub,
    url: 'https://github.com/BozinovskiDaniel'
  },
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/BozinovskiDaniel'
  },
]

export const Links: FunctionComponent = memo(() => (
  <Centered>
    {links.map(icon => (
      <a
        key={icon.url}
        className="mx-4 mt-4 transform-gpu border-white text-4xl text-white transition duration-200 ease-in-out md:mx-6 md:mt-6 md:text-5xl md:hover:scale-150"
        href={icon.url}
        rel="noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={icon.icon} />
      </a>
    ))}
  </Centered>
))
