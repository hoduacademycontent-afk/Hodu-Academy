'use client'

import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollFloatProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div' | 'p';
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

function renderSplitNode(node: React.ReactNode, keyPrefix = 'c'): React.ReactNode {
  if (typeof node === 'string' || typeof node === 'number') {
    const str = String(node);
    const words = str.split(' ');
    return words.map((word, wIdx) => (
      <span key={`${keyPrefix}-w-${wIdx}`} className="inline-block whitespace-nowrap">
        {word.split('').map((char, index) => (
          <span className="char" key={`${keyPrefix}-w-${wIdx}-${index}`}>
            {char}
          </span>
        ))}
        {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    ));
  }
  if (Array.isArray(node)) {
    return node.map((item, index) => renderSplitNode(item, `${keyPrefix}-${index}`));
  }
  if (React.isValidElement(node)) {
    const props = node.props as any;
    if (props && props.children) {
      return React.cloneElement(node, {
        ...props,
        key: node.key || keyPrefix,
        children: renderSplitNode(props.children, `${keyPrefix}-child`),
      });
    }
  }
  return node;
}

export const ScrollFloat = ({
  children,
  as: Component = 'h2',
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'top bottom-=10%',
  scrollEnd = 'bottom center+=20%',
  stagger = 0.018,
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitContent = useMemo(() => {
    return renderSplitNode(children);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll('.char');
    if (!charElements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  const Tag = Component as any;

  return (
    <Tag ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitContent}</span>
    </Tag>
  );
};

export interface ScrollFloatCardProps {
  children: React.ReactNode;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  y?: number;
  scale?: number;
}

export const ScrollFloatCard = ({
  children,
  className = '',
  scrollContainerRef,
  animationDuration = 1,
  ease = 'power2.out',
  scrollStart = 'top bottom-=5%',
  scrollEnd = 'bottom center+=30%',
  y = 40,
  scale = 0.96,
}: ScrollFloatCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0.2,
          y: y,
          scale: scale,
          transformOrigin: '50% 100%',
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, y, scale]);

  return (
    <div ref={cardRef} className={`scroll-float-card ${className}`}>
      {children}
    </div>
  );
};

export default ScrollFloat;
