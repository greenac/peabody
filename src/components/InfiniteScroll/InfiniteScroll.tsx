import React, { useState, useEffect, PropsWithChildren } from "react"
import { Container } from "react-bootstrap"

export interface IInfiniteScrollProps {
    page: number
    itemsToDisplay: number
    itemsPerPage: number
    fetchNext: (page: number) => Promise<void>
}

const InfiniteScroll = (props: PropsWithChildren<IInfiniteScrollProps>) => {
    const { fetchNext, itemsToDisplay, page } = props

    useEffect(() => {
        console.log("debug: InfiniteScroll useEffect called for page:", page)
        fetchNext(page).catch(e => console.log("InfiniteScroll->failed to fetch page with error:", e))
        window.addEventListener("scroll", handleScroll)
        return () => {
            console.log("removing scroll listener")
            window.removeEventListener("scroll", handleScroll)
        }
    }, [ page ])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            console.log("at top of page")
            return
        }

        if (document.scrollingElement?.scrollHeight! - document.scrollingElement?.scrollTop! === document.scrollingElement?.clientHeight!) {
            console.log("at bottom of page")
            fetchNext(page+1)
            return
        }
        //
        // console.log("scroll height:", document.scrollingElement?.scrollHeight!)
        // console.log("scroll top:", document.scrollingElement?.scrollTop!)
        // console.log("left:", document.scrollingElement?.scrollHeight! - document.scrollingElement?.scrollTop!)
        // console.log("right:", document.scrollingElement?.clientHeight!)
    }

    return (
        <Container>
            { props.children }
        </Container>
    )
}

export default InfiniteScroll