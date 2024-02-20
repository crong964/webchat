
interface content {
    content: string
    idBox: string
    type: string
    ngay: string
}

function yourmess(mess: content) {
    var image = (document.getElementById('yourimage') as HTMLInputElement).value
    return `
    <div class="w-full M" onmouseenter="shownavigate('')"
    onmouseleave="hidennaviagte('')">
    <div class="w-1/2  my-2 ml-2 ">
        <div class="flex items-center">
            <div class="overflow-hidden w-10 h-10 rounded-full mr-3">
                    <img class="" src="${image}" alt="" srcset="">
            </div>
            <div class="grid grid-cols-1 relative max-w-lg">
                <div class="bg-blue-200 p-2 rounded-md">
                    <p class="M${mess.type} text-right ">
                       ${mess.content}
                    </p>
                    <p class="text-right text-red-400 ">
                        ${mess.ngay}
                    </p>
                </div>
                <div class="hidden N ml-3 rounded-full p-1 h-6 w-6 absolute left-full top-1/2 z-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        onclick="removemess('')" class="fill-black hover:fill-blue-500"
                        viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
`
}
function mymess(mess: content) {
    return `
    <div class="w-full " onmouseenter="shownavigate('')"
                onmouseleave="hidennaviagte('')">
                <div class="flex justify-end items-center ">
                    <div class="hidden N h-5 w-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            onclick="removemess('')" class="fill-black hover:fill-blue-500"
                            viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </div>
                    <div class=" grid grid-cols-1 justify-items-end p-2">
                        <div class="w-fit bg-stone-200 p-2 rounded-xl max-w-md">
                            <div class="M${mess.type}">
                                ${mess.content}
                            </div>
                            <p class=" text-red-400">
                                ${mess.ngay}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            `
}
function showyourmess(data: content) {
    var id = `box${data.idBox}`

    var box = document.querySelector(`.${id}`)
    if (box != null) {
        box.innerHTML += yourmess(data)
    }
}
function showmymess(data: content) {
    var id = `box${data.idBox}`
    var box = document.querySelector(`.${id}`)
    if (box != null) {
        box.innerHTML += mymess(data)
    }
}
function boxscroll() {
    var boxscroll = document.querySelector(".boxscroll") as HTMLElement

    boxscroll.scroll({
        behavior: "smooth",
        top: boxscroll.scrollHeight
    })
}

function ConvertTexttoImage(image: string) {
    var s = `http://localhost:666/public/upload/${image}`
    return `
       <span class="w-fit"> <img src="${s}" class="w-30 h-auto" alt="" srcset=""></span>
    `
}
function ConvertTextToImages() {
    document.querySelectorAll('.M1').forEach((v) => {
        var texts = v.innerHTML
        texts = texts.trim()

        var r = texts.split(" ")
        var a = r.map((text) => {
            return ConvertTexttoImage(text)
        })
        v.innerHTML = ""
        v.classList.remove("M1")
        v.classList.add("grid", "grid-cols-4", "gap-4")

        for (let i = 0; i < a.length; i++) {
            const e = a[i];
            v.innerHTML += e
        }
    })
}
function size(p: HTMLImageElement) {

}
function zoom(p: HTMLInputElement) {

    var image = document.querySelector(".image") as HTMLImageElement
    image.height = 1080 * parseInt(p.value) / 100
    image.width = 1920 * parseInt(p.value) / 100
}
function scrollimage(t: HTMLElement) {
    console.log(`${t.scrollTop}  ${t.scrollLeft}`);
}
function simple(image: string, name: string, id: string) {
    return `
    <div class="flex flex-col justify-center mr-6 TV${id} cursor-pointer"
        onclick="removelist(this,'CB${id}')">
        <input type="hidden" name="ls[]" value="${id}">
        <div class="w-14 h-14 overflow-hidden ">
            <img class="rounded-full w-full h-auto" src="${image}" alt=""
                srcset="" />
        </div>
        <div class=" font-mono text-center w-14 h-5 overflow-hidden">
            ${name}
        </div>
    </div>`
}
function list(image: string, name: string, id: string, p: HTMLElement) {
    p.classList.add("text-red-500")
    var d = document.querySelector(".cactv") as HTMLElement
    var tv = document.querySelector(`.TV${id}`)


    if (!tv) {
        d.innerHTML += simple(image, name, id)
    }

}
function removelist(p: HTMLElement, cb: string) {
    var d = document.querySelector(`.${cb}`) as HTMLElement
    d.classList.remove('text-red-500')
    p.remove()
}