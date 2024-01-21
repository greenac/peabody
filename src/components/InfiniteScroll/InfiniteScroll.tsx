import React, { useState, useEffect, PropsWithChildren } from "react"
import { Container } from "react-bootstrap"

export interface IInfiniteScrollProps {
    itemsToDisplay: number
    itemsPerPage: number
    fetchNext: (page: number) => Promise<void>
}

const InfiniteScroll = (props: PropsWithChildren<IInfiniteScrollProps>) => {
    const { fetchNext, itemsToDisplay } = props
    const [ page, setPage ] = useState(0)

    useEffect(() => {
        console.log("InfiniteScroll useEffect called")
        fetchNext(page).catch(e => console.log("InfiniteScroll->failed to fetch page with error:", e))
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [ page ])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            console.log("at top of page")
            return
        }

        if (document.scrollingElement?.scrollHeight! - document.scrollingElement?.scrollTop! === document.scrollingElement?.clientHeight!) {
            console.log("at bottom of page")
            setPage(page + 1)
        }
    }

    return (
        <Container>
            { props.children }
            <h1>Total Items {itemsToDisplay}</h1>
        </Container>
    )
}

export default InfiniteScroll
