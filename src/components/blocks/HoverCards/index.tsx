'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'

import { BackgroundGrid } from '@components/BackgroundGrid/index.js'
import { BlockWrapper, PaddingProps } from '@components/BlockWrapper/index.js'
import { CMSLink } from '@components/CMSLink/index.js'
import { Gutter } from '@components/Gutter/index.js'
import { RichText } from '@components/RichText/index.js'
import { ArrowIcon } from '@root/icons/ArrowIcon/index.js'
import { CrosshairIcon } from '@root/icons/CrosshairIcon/index.js'
import { Page } from '@root/payload-types.js'

import classes from './index.module.scss'

export type HoverCardsProps = Extract<Page['layout'][0], { blockType: 'hoverCards' }> & {
  padding: PaddingProps
  hideBackground?: boolean
}

const Card: React.FC<{
  leader: number
  card: NonNullable<HoverCardsProps['hoverCardsFields']['cards']>[number]
  setHover: Dispatch<SetStateAction<number>>
}> = ({ card, leader, setHover }) => {
  return (
    <div
      className={classes.cardWrapper}
      onMouseEnter={() => setHover(++leader)}
      onMouseLeave={() => setHover(1)}
    >
      <CMSLink className={classes.card} {...card.link}>
        <p className={classes.leader}>0{leader}</p>
        <div className={classes.cardContent}>
          <h3 className={classes.cardTitle}>{card.title}</h3>
          <p className={classes.description}>{card.description}</p>
        </div>
        <ArrowIcon className={classes.arrow} />
      </CMSLink>
    </div>
  )
}

export const HoverCards: React.FC<HoverCardsProps> = props => {
  const { hoverCardsFields, padding, hideBackground } = props
  const [activeGradient, setActiveGradient] = useState(1)

  const gradients = [1, 2, 3, 4, 5]

  const hasCards = Array.isArray(hoverCardsFields.cards) && hoverCardsFields.cards.length > 0

  return (
    <BlockWrapper
      settings={{ theme: 'dark' }}
      padding={{ bottom: 'large', top: 'large' }}
      hideBackground={hideBackground}
      className={[classes.wrapper].filter(Boolean).join(' ')}
    >
      <BackgroundGrid zIndex={1} />
      {!hideBackground && !hoverCardsFields.hideBackground && (
        <div className={classes.noiseWrapper}>
          {gradients.map(gradient => {
            return (
              <Image
                key={gradient}
                alt=""
                className={[classes.bg, activeGradient === gradient && classes.activeBg]
                  .filter(Boolean)
                  .join(' ')}
                width={1920}
                height={946}
                src={`/images/gradients/${gradient === 5 ? 2 : gradient}.jpg`}
              />
            )
          })}
        </div>
      )}
      <Gutter>
        <div className={[classes.introWrapper, 'grid'].filter(Boolean).join(' ')}>
          {hoverCardsFields.richText && (
            <RichText
              className={[classes.richText, 'cols-12 cols-m-8'].filter(Boolean).join(' ')}
              content={hoverCardsFields.richText}
            />
          )}
        </div>

        {hasCards && (
          <div className={classes.cards}>
            <div className={['grid', classes.cardsWrapper].filter(Boolean).join(' ')}>
              <BackgroundGrid className={classes.backgroundGrid} ignoreGutter />
              {hoverCardsFields.cards &&
                hoverCardsFields.cards.map((card, index) => {
                  return (
                    <div key={card.id} className={'cols-4 cols-s-8'}>
                      <Card card={card} leader={++index} setHover={setActiveGradient} />
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </Gutter>
    </BlockWrapper>
  )
}
