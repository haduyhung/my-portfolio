"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";

interface HeroButtonProps {
  href: string;
  text: string;
  showLogo?: boolean;
  variant?: "primary" | "outline";
}

export function HeroButton({ href, text, showLogo = true, variant = "primary" }: HeroButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const shapkaRef = useRef<HTMLDivElement>(null);
  const rotatingRef = useRef<HTMLImageElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // GSAP rotate logo timeline
  useEffect(() => {
    if (!rotatingRef.current) return;

    timelineRef.current = gsap
      .timeline({ defaults: { ease: "none" }, repeat: -1, paused: true })
      .fromTo(
        rotatingRef.current,
        { rotation: 0 },
        { rotation: -360, duration: 3 }
      );

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  // Magnetic effect
  useEffect(() => {
    const btn = buttonRef.current;
    const shapka = shapkaRef.current;
    if (!btn) return;

    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    const strength = 50;

    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / btn.offsetWidth - 0.5;
      const y = (e.clientY - rect.top) / btn.offsetHeight - 0.5;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        ease: "power2.out",
        duration: 1,
      });

      if (shapka) {
        gsap.to(shapka, {
          x: x * (strength / 2),
          y: y * (strength / 2),
          ease: "power2.out",
          duration: 1,
        });
      }
    };

    const handleOut = () => {
      gsap.to([btn, shapka].filter(Boolean), {
        x: 0,
        y: 0,
        ease: "elastic.out(1, 0.4)",
        duration: 1.5,
      });
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseout", handleOut);

    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseout", handleOut);
      gsap.killTweensOf([btn, shapka].filter(Boolean));
    };
  }, []);

  // Scramble text effect
  const scramble = useCallback((el: HTMLElement, original: string) => {
    const chars = "!@#$%^&*()-=+[]{}|;:<>?ABCDEFabcdef0123456789";
    let iteration = 0;
    const speed = 15;

    const animate = () => {
      const result = original
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return original[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      el.textContent = result;
      iteration += 2 / 3;

      if (iteration < original.length) {
        requestAnimationFrame(() => setTimeout(animate, speed));
      } else {
        el.textContent = original;
      }
    };

    animate();
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    timelineRef.current?.play();

    const btn = buttonRef.current;
    if (!btn) return;
    const scrambleEls = btn.querySelectorAll<HTMLElement>(".scramble-text");
    scrambleEls.forEach((el) => {
      const original = el.dataset.text || el.textContent || "";
      scramble(el, original);
    });
  }, [scramble]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    timelineRef.current?.pause();

    const btn = buttonRef.current;
    if (!btn) return;
    const scrambleEls = btn.querySelectorAll<HTMLElement>(".scramble-text");
    scrambleEls.forEach((el) => {
      el.textContent = el.dataset.text || "";
    });
  }, []);

  return (
    <a
      ref={buttonRef}
      href={href}
      className={`hero-btn isolate z-20 flex justify-center rounded-full will-change-transform ${
        variant === "primary"
          ? "bg-gradient-to-r from-accent to-accent-secondary"
          : "border border-border hover:bg-secondary"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={shapkaRef}
        className="flex items-center justify-center gap-0 will-change-transform"
      >
        {/* Text + Arrow */}
        <p className={`flex items-center whitespace-nowrap text-sm font-semibold ${
          variant === "primary" ? "text-white" : "text-foreground"
        } ${showLogo ? "pl-4 pr-1 py-3" : "px-8 py-4"}`}>
          <span
            className="scramble-text inline-block transition-transform duration-300"
            data-text={text}
            style={{
              minWidth: `${text.length}ch`,
              transform: !showLogo && isHovered ? "translateX(-8px)" : "translateX(0)",
            }}
          >
            {text}
          </span>
          {!showLogo && (
            <ArrowRight
              size={22}
              strokeWidth={2}
              className="-ml-3 shrink-0 transition-all duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateX(0)" : "translateX(-8px)",
              }}
            />
          )}
        </p>

        {/* Rotating logo */}
        {showLogo && (
          <div className="flex items-center justify-center p-1.5 md:pr-3">
            <div
              ref={rotatingRef as React.RefObject<HTMLDivElement>}
              className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full border-2 border-white/30 bg-background/20 md:h-[42px] md:w-[42px]"
            >
              <Image
                src="/logo.png"
                alt=""
                width={32}
                height={32}
                style={{ width: 32, height: 32 }}
                className="rounded-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </a>
  );
}
