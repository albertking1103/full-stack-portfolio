/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, usePresence, useScroll } from 'framer-motion';

import { useGlobalContext, useNavbarContext } from '../store';

import styles from './About.module.css';

import selfCasualPic from '../assets/images/self-images/self-casual-pic-min.png';
import selfDescentPic from '../assets/images/self-images/self-descent-pic-min.webp';
import selfAvatar from '../assets/images/self-images/self-avatar-3-min.jpg';
import primaryAccentGraphicSL from '../assets/accent-graphics/SL--primary-accent-graphic-min.png';
import primaryAccentGraphicM from '../assets/accent-graphics/M--primary-accent-graphic-min.png';

import {
    handlePageTransitionScreenArrival,
    handlePageTransitionScreenRemoval,
} from '../utils/helpers';
import FloatingScrollTop from '../components/FloatingScrollTop';

const selfImagesArr = [
    { path: selfCasualPic, alt: 'Pravin portrait image 1' },
    { path: selfDescentPic, alt: 'Pravin portrait image 2' },
    { path: selfAvatar, alt: 'Pravin portrait image 3' },
];

const verticalTimelineAnimationLeft = {
    contentContainer: {
        initial: { x: '-30%', opacity: 0 },
        animate: { x: '0', opacity: 1 },
        transition: { type: 'spring', duration: 0.8, damping: 14, mass: 1.7, delay: 0.4 },
    },
    dateContainer: {
        initial: { x: '-30px', opacity: 0 },
        animate: { x: '0', opacity: 1 },
        transition: { type: 'spring', duration: 0.8, damping: 15, mass: 1.3, delay: 0.8 },
    },
    viewport: { once: true, amount: 0.3 },
};

const verticalTimelineAnimationRight = {
    contentContainer: {
        initial: { x: '30%', opacity: 0 },
        animate: { x: '0', opacity: 1 },
        transition: { type: 'spring', duration: 0.8, damping: 14, mass: 1.7, delay: 0.4 },
    },
    dateContainer: {
        initial: { x: '30px', opacity: 0 },
        animate: { x: '0', opacity: 1 },
        transition: { type: 'spring', duration: 0.8, damping: 15, mass: 1.3, delay: 0.8 },
    },
};

const contentContainerLeftAnimationObj = {
    initial: verticalTimelineAnimationLeft.contentContainer.initial,
    whileInView: verticalTimelineAnimationLeft.contentContainer.animate,
    transition: verticalTimelineAnimationLeft.contentContainer.transition,
    viewport: verticalTimelineAnimationLeft.viewport,
};

const contentContainerRightAnimationObj = {
    initial: verticalTimelineAnimationRight.contentContainer.initial,
    whileInView: verticalTimelineAnimationRight.contentContainer.animate,
    transition: verticalTimelineAnimationRight.contentContainer.transition,
    viewport: verticalTimelineAnimationLeft.viewport,
};

const middleCircleAnimationObj = {
    initial: { scale: 0.4, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { type: 'spring', duration: 0.8, damping: 14, mass: 1.7 },
    viewport: verticalTimelineAnimationLeft.viewport,
};

const dateContainerLeftAnimationObj = {
    initial: verticalTimelineAnimationLeft.dateContainer.initial,
    whileInView: verticalTimelineAnimationLeft.dateContainer.animate,
    transition: verticalTimelineAnimationLeft.dateContainer.transition,
    viewport: verticalTimelineAnimationLeft.viewport,
};

const dateContainerRightAnimationObj = {
    initial: verticalTimelineAnimationRight.dateContainer.initial,
    whileInView: verticalTimelineAnimationRight.dateContainer.animate,
    transition: verticalTimelineAnimationRight.dateContainer.transition,
    viewport: verticalTimelineAnimationLeft.viewport,
};

const AboutPage = () => {
    const { aboutPageActiveTab } = useGlobalContext();
    const { handleNavbarVisibilityState } = useNavbarContext();

    const [scrollTopVisibility, setScrollTopVisibility] = useState(false);

    const aboutMainRef = useRef(null);
    const tabHighlightRef = useRef(null);
    const firstTabBtnRef = useRef(null);
    const secondTabBtnRef = useRef(null);

    const [activeTabNum, setActiveTabNum] = useState(0);

    const { scrollYProgress } = useScroll();

    const [isPresent, safeToRemove] = usePresence();

    useMotionValueEvent(scrollYProgress, 'change', latest => {
        if (latest === 1) return;

        if (latest > 0.01) {
            handleNavbarVisibilityState(false);
            setScrollTopVisibility(true);
        } else {
            handleNavbarVisibilityState(true);
            setScrollTopVisibility(false);
        }
    });

    const handleTabHighlight = coords => {
        tabHighlightRef.current.style.width = `${coords.width}px`;
        tabHighlightRef.current.style.height = `${coords.height}px`;
        tabHighlightRef.current.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    };

    const handleActiveTab = (eventObj, tabNum) => {
        setActiveTabNum(tabNum);

        const mainPaddingVert = Number.parseFloat(
            window.getComputedStyle(aboutMainRef.current).paddingTop
        );
        const mainPaddingHor = Number.parseFloat(
            window.getComputedStyle(aboutMainRef.current).paddingLeft
        );

        const coords = {
            width: eventObj.target.getBoundingClientRect().width,
            height: eventObj.target.getBoundingClientRect().height,

            top: eventObj.target.getBoundingClientRect().top + window.scrollY - mainPaddingVert,
            left: eventObj.target.getBoundingClientRect().left + window.scrollX - mainPaddingHor,
        };

        handleTabHighlight(coords);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        aboutPageActiveTab === 0 && firstTabBtnRef.current && firstTabBtnRef.current.click();
        aboutPageActiveTab === 1 && secondTabBtnRef.current && secondTabBtnRef.current.click();
    }, [aboutPageActiveTab]);

    useEffect(() => {
        handlePageTransitionScreenRemoval();
    }, []);

    useEffect(() => {
        if (!isPresent) {
            handlePageTransitionScreenArrival(safeToRemove);
        }
    }, [isPresent, safeToRemove]);

    let aboutContentToDisplay = <PersonalTabContent />;

    if (activeTabNum === 1) aboutContentToDisplay = <ProfessionTabContent />;

    if (activeTabNum === 2) aboutContentToDisplay = <TimelineTabContent />;

    return (
        <main className={`${styles.about_page_main}`} ref={aboutMainRef}>
            <div
                className={`frost_glass frost_glass_page_padding_top ${styles.about_page_frost_glass}`}
            >
                <section className={`section_container ${styles.about_section_container}`}>
                    <div className={styles.self_pic_container}>
                        {selfImagesArr.map((imgObj, index) => (
                            <img
                                key={imgObj.path}
                                src={imgObj.path}
                                alt={`${imgObj.alt}`}
                                className={activeTabNum === index ? `${styles.active_pic}` : ''}
                            />
                        ))}
                    </div>
                    <div className={`body_text_400 ${styles.tabs_container}`}>
                        
                        <button
                            className={`first_frost_layer ${styles.tab_btn}`}
                            onClick={e => handleActiveTab(e, 2)}
                            ref={firstTabBtnRef}
                        >
                            Last 7 years timeline
                        </button>
                        <button
                            className={`first_frost_layer ${styles.tab_btn}`}
                            onClick={e => handleActiveTab(e, 0)}
                            ref={firstTabBtnRef}
                        >
                            Education
                        </button>
                        <button
                            className={`first_frost_layer ${styles.tab_btn}`}
                            onClick={e => handleActiveTab(e, 1)}
                            ref={secondTabBtnRef}
                        >
                            Certification
                        </button>
                        <div
                            className={`about_page_tab_btn_highlight_general_styling ${styles.tab_btn_highlight}`}
                            ref={tabHighlightRef}
                        ></div>
                    </div>
                    <div
                        className={`${styles.about_content_layout_wrapper} ${
                            activeTabNum === 2
                                ? `${styles.about_content_layout_wrapper_timeline}`
                                : ''
                        }`}
                    >
                        <AnimatePresence mode="wait">{aboutContentToDisplay}</AnimatePresence>
                    </div>
                </section>
                <div
                    className={`primary_accent_graphic_container ${styles.about_page_primary_accent_graphic}`}
                >
                    <picture>
                        <source srcSet={primaryAccentGraphicM} media="(min-width: 1450px)" />
                        <img
                            src={primaryAccentGraphicSL}
                            alt="About page primary-accent-graphic image"
                        />
                    </picture>
                </div>
            </div>
            <FloatingScrollTop
                scrollTopVisible={scrollTopVisibility}
                handleScrollToTop={scrollToTop}
                scrollProgress={scrollYProgress}
            />
        </main>
    );
};

const PersonalTabContent = () => {
    return (
        <m.div
            className={styles.personal_content_container}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            <h4 className={`body_text_800 ${styles.headline}`}>
                University of Montreal
            </h4>
            <p className={`body_text_500 ${styles.standalone_para}`}>
                Bachelor's Degree in Computer Science
            </p>
        </m.div>
    );
};

const ProfessionTabContent = () => {
    return (
        <m.div
            className={styles.profession_content_container}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
        >
            <h4 className={`body_text_800 ${styles.headline}`}>Certification</h4>
            <p className={`body_text_500 ${styles.standalone_para}`}>
            Senior Frontend Developer with 6֡ years of experience in designing and
            building high-performance web applications using React, Vue, Angular and
            Nextjs. Strong expertise in front-end technologies, state management, and user
            interface design. Proven leadership in mentoring teams and adhering to best
            practices. Passionate about innovation and continuous learning 😅.
            </p>

            <p className={`body_text_500 ${styles.standalone_para}`}>
            FullStack Web Development from RoomMan 😅.
            </p>

            <p className={`body_text_500 ${styles.standalone_para}`}>
            FullStack Web Development from Electronics & ICT Academy 😅.
            </p>

            <p className={`body_text_500 ${styles.standalone_para}`}>
            Frontend Web Development from Udemy 😅.
            </p>
        </m.div>
    );
};

const TimelineTabContent = () => {
    return (
        <m.div
            className={styles.vertical_timeline_container}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={`${styles.vertical_timeline_row} ${styles.vertical_timeline_left_aligned}`}
            >
                <m.div
                    className={styles.timeline_content_animation_wrapper}
                    initial={verticalTimelineAnimationLeft.contentContainer.initial}
                    whileInView={verticalTimelineAnimationLeft.contentContainer.animate}
                    transition={{
                        ...verticalTimelineAnimationLeft.contentContainer.transition,
                        delay: 1,
                    }}
                    viewport={verticalTimelineAnimationLeft.viewport}
                >
                    <div className={styles.timeline_content_container}>
                        <p className="body_text_500">
                            <span className="word_highlight_2">Terraform</span> 
                            <br></br>
                            -Manage project resources; lead team of 3 personnel & adhered to safety standards.<br></br>
                            -Collaborated with cross-functional teams, including UX/UI designers and
                                backend developers, to translate project requirements into interactive,
                                responsive, and visually appealing user interfaces.<br>
                                </br>
                            -Implemented state management solutions, including Redux or React Context
                            API, to efficiently manage application data and ensure seamless
                            communication with RESTful APIs and GraphQL endpoints.
                        </p>
                    </div>
                    <div className={styles.sm_date_container}>
                        <p> AUG 2022- Current</p>
                    </div>
                </m.div>
                <m.div
                    className={styles.timeline_mid_circle}
                    style={{ backgroundColor: 'var(--primary-clr-600)' }}
                    {...middleCircleAnimationObj}
                ></m.div>
                <m.div
                    className={styles.timeline_date_container}
                    {...dateContainerLeftAnimationObj}
                >
                    <p className={`body_text_600 ${styles.timeline_date}`}>AUG 2022- Current</p>
                </m.div>
            </div>
            <div
                className={`${styles.vertical_timeline_row} ${styles.vertical_timeline_right_aligned}`}
            >
                <m.div
                    className={styles.timeline_content_animation_wrapper}
                    {...contentContainerRightAnimationObj}
                >
                    <div className={styles.timeline_content_container}>
                        <p className="body_text_500">
                            <span className="word_highlight_2">Roweb Development</span> 
                            <br></br>
                            -Revamped Angular Material and app interface for customer-facing ecommerce site with 200,000֡ unique visitors per month.<br></br>
                            -Designed and developed front-end for 20֡ websites, using jQuery, AJAX,
                            Reactjs, and Angular.js.<br></br>
                            -Created custom AngularJS components for internal framework.<br></br>
                            -Automated image optimization, using Grunt and minified JS and CSS, which
                            reduced page load times by up to 30%.
                        </p>
                    </div>
                    <div className={styles.sm_date_container}>
                        <p>APR 2020 - JUL 2022</p>
                    </div>
                </m.div>
                <m.div className={styles.timeline_mid_circle} {...middleCircleAnimationObj}></m.div>
                <m.div
                    className={styles.timeline_date_container}
                    {...dateContainerRightAnimationObj}
                >
                    <p className={`body_text_600 ${styles.timeline_date}`}>APR 2020 - JUL 2022</p>
                </m.div>
            </div>
            <div
                className={`${styles.vertical_timeline_row} ${styles.vertical_timeline_left_aligned}`}
            >
                <m.div
                    className={styles.timeline_content_animation_wrapper}
                    {...contentContainerLeftAnimationObj}
                >
                    <p className="body_text_500">
                            <span className="word_highlight_2">Personio</span> 
                            <br></br>
                            -Led the development and architecture of 3 complex web applications,
                            demonstrating expertise in React.js, Redux, and other related technologies
                            to deliver high-performance, scalable, and user-friendly solutions.<br></br>
                            -Mentored and provided guidance to junior developers, fostering a culture of
                            knowledge sharing and continuous learning within the team.<br></br>
                            -Developed reusable UI components and libraries to standardize design
                            patterns and improve code maintainability, resulting in accelerated
                            development timelines.
                    </p>
                    <div className={styles.sm_date_container}>
                        <p> SEP 2018 - FEB 2020</p>
                    </div>
                </m.div>
                <m.div className={styles.timeline_mid_circle} {...middleCircleAnimationObj}></m.div>
                <m.div
                    className={styles.timeline_date_container}
                    {...dateContainerLeftAnimationObj}
                >
                    <p className={`body_text_600 ${styles.timeline_date}`}>SEP 2018 - FEB 2020</p>
                </m.div>
            </div>
            <div
                className={`${styles.vertical_timeline_row} ${styles.vertical_timeline_right_aligned}`}
            >
                <m.div
                    className={styles.timeline_content_animation_wrapper}
                    {...contentContainerRightAnimationObj}
                >
                    <div className={styles.timeline_content_container}>
                        <p className="body_text_500">
                                <span className="word_highlight_2">SUSE</span> 
                                <br></br>
                                -Played a key role in the development and enhancement of web applications,
                                gaining practical experience in front-end development and user interface
                                design.<br></br>
                               - Developed interactive and responsive web applications using React.js,
                                ensuring high performance and cross-browser compatibility.<br></br>
                                -Developed responsive web applications using HTML, CSS, and JavaScript,
                                ensuring cross-browser compatibility and optimal performance.
                        </p>
                    </div>
                    <div className={styles.sm_date_container}>
                        <p>MAR 2017 - AUG 2018</p>
                    </div>
                </m.div>
                <m.div
                    className={styles.timeline_mid_circle}
                    style={{ backgroundColor: 'rgb(145 174 255)' }}
                    {...middleCircleAnimationObj}
                ></m.div>
                <m.div
                    className={styles.timeline_date_container}
                    {...dateContainerRightAnimationObj}
                >
                    <p className={`body_text_600 ${styles.timeline_date}`}>MAR 2017 - AUG 2018</p>
                </m.div>
            </div>
        </m.div>
    );
};

export default AboutPage;
