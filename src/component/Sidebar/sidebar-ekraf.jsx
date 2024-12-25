import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State untuk kontrol buka/tutup sidebar
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const handleMenuClick = (path) => {
    navigate(path); // Navigasi ke halaman sesuai menu yang diklik
    setActiveMenu(path); // Set aktif menu yang dipilih
  };
  useEffect(() => {
    setActiveMenu(location.pathname); // Update activeMenu saat lokasi berubah
  }, [location]); // Menggunakan useEffect agar aktif saat path berubah

  useEffect(() => {
    // Cari elemen dengan kelas "active"
    const activeElement = document.querySelector(".sidebar .active");

    if (activeElement) {
      // Scroll elemen aktif ke posisi atas dalam kontainer sidebar
      activeElement.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  }, [activeMenu]); // Jalankan efek ketika activeMenu berubah

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Mengubah state buka/tutup
  };

  // Custom SVG Icon Component
  const CustomIcon = ({ size = 24, iconType }) => {
    const iconPaths = {
      kuliner: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M368 128h.09m111.46-32h-91.06l8.92-35.66l38.32-13.05c8.15-2.77 13-11.43 10.65-19.71a16 16 0 0 0-20.54-10.73l-47 16a16 16 0 0 0-10.36 11.27L355.51 96H224.45c-8.61 0-16 6.62-16.43 15.23A16 16 0 0 0 224 128h2.75l1 8.66A8.3 8.3 0 0 0 236 144c39 0 73.66 10.9 100.12 31.52A121.9 121.9 0 0 1 371 218.07a123.4 123.4 0 0 1 10.12 29.51a7.83 7.83 0 0 0 3.29 4.88a72 72 0 0 1 26.38 86.43a7.92 7.92 0 0 0-.15 5.53A96 96 0 0 1 416 376c0 22.34-7.6 43.63-21.4 59.95a80.1 80.1 0 0 1-28.78 21.67a8 8 0 0 0-4.21 4.37a108.2 108.2 0 0 1-17.37 29.86a2.5 2.5 0 0 0 1.9 4.11h49.21a48.22 48.22 0 0 0 47.85-44.14L477.4 128h2.6a16 16 0 0 0 16-16.77c-.42-8.61-7.84-15.23-16.45-15.23"
          ></path>
          <path
            fill="currentColor"
            d="M108.69 320a23.87 23.87 0 0 1 17 7l15.51 15.51a4 4 0 0 0 5.66 0L162.34 327a23.87 23.87 0 0 1 17-7h196.58a8 8 0 0 0 8.08-7.92V312a40.07 40.07 0 0 0-32-39.2c-.82-29.69-13-54.54-35.51-72C295.67 184.56 267.85 176 236 176h-72c-68.22 0-114.43 38.77-116 96.8A40.07 40.07 0 0 0 16 312a8 8 0 0 0 8 8Zm77.25 32a8 8 0 0 0-5.66 2.34l-22.14 22.15a20 20 0 0 1-28.28 0l-22.14-22.15a8 8 0 0 0-5.66-2.34h-69.4a15.93 15.93 0 0 0-15.76 13.17A65 65 0 0 0 16 376c0 30.59 21.13 55.51 47.26 56c2.43 15.12 8.31 28.78 17.16 39.47C93.51 487.28 112.54 496 134 496h132c21.46 0 40.49-8.72 53.58-24.55c8.85-10.69 14.73-24.35 17.16-39.47c26.13-.47 47.26-25.39 47.26-56a65 65 0 0 0-.9-10.83A15.93 15.93 0 0 0 367.34 352Z"
          ></path>
        </svg>
      ),
      fashion: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none" fillRule="evenodd">
            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
            <path
              fill="currentColor"
              d="M15.847 3c.172 0 .344.003.508.065a2 2 0 0 1 1.472 2.218l-.158 1.104l1.059.264A3 3 0 0 1 21 9.561V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.562a3 3 0 0 1 2.272-2.91l1.059-.265l-.158-1.104a2 2 0 0 1 1.472-2.218C7.81 3.003 7.981 3 8.153 3zM12 7.4L13.92 5h-3.84zm3.71-1.436L13.553 8.66l1.652 1.826l.503-4.52Zm-7.42 0l.504 4.521l1.652-1.826l-2.155-2.695ZM16 14a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2z"
            ></path>
          </g>
        </svg>
      ),
      kriya: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none" fillRule="evenodd">
            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
            <path
              fill="currentColor"
              d="M10.2 3c0-1.105.696-2 1.8-2s1.8.895 1.8 2l.2 8c0-.364.5-5.66.5-6c0-1 .595-2 1.7-2s1.8.895 1.8 2v7.268c.083-.048.3-3.846.3-4.268c0-1 .263-2 1.2-2c.938 0 1.5.895 1.5 2v6a8 8 0 0 1-8 8h-.674a8 8 0 0 1-7.155-4.422l-2.842-5.684c-.364-.728-.084-1.668.72-2.024c.423-.187.897-.292 1.343-.15c1.108.353.944.86 1.608 1.49V5c0-1.105.695-2 1.8-2c1 0 1.609 1.315 1.7 2c.125.938.5 5.634.5 5.998z"
            ></path>
          </g>
        </svg>
      ),
      senipertunjukan: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.25em"
          height="1em"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M74.6 373.2c41.7 36.1 108 82.5 166.1 73.7c6.1-.9 12.1-2.5 18-4.5c-9.2-12.3-17.3-24.4-24.2-35.4c-21.9-35-28.8-75.2-25.9-113.6c-20.6 4.1-39.2 13-54.7 25.4c-6.5 5.2-16.3 1.3-14.8-7c6.4-33.5 33-60.9 68.2-66.3c2.6-.4 5.3-.7 7.9-.8l19.4-131.3c2-13.8 8-32.7 25-45.9c18.6-14.3 50.9-30.5 103.6-35.3l-2.4-2.1c-20.2-15.6-72.4-41.6-185.1-24.5S20.5 63 5.7 83.9C0 91.9-.8 102 .6 111.8l24.2 164.3c5.5 37.3 21.5 72.6 49.8 97.2zm87.7-219.6c4.4-3.1 10.8-2 11.8 3.3c.1.5.2 1.1.3 1.6c3.2 21.8-11.6 42-33.1 45.3S99.8 192 96.6 170.3c-.1-.5-.1-1.1-.2-1.6c-.6-5.4 5.2-8.4 10.3-6.7c9 3 18.8 3.9 28.7 2.4s19.1-5.3 26.8-10.8zM261.6 390c29.4 46.9 79.5 110.9 137.6 119.7s124.5-37.5 166.1-73.7c28.3-24.5 44.3-59.8 49.8-97.2l24.2-164.3c1.4-9.8.6-19.9-5.1-27.9c-14.8-20.9-57.3-61.2-170-78.3s-164.8 8.9-185 24.5c-7.8 6-11.5 15.4-12.9 25.2l-24.2 164.3c-5.5 37.3-.4 75.8 19.6 107.7zm142.9-154.7c-7.7-5.5-16.8-9.3-26.8-10.8s-19.8-.6-28.7 2.4c-5.1 1.7-10.9-1.3-10.3-6.7c.1-.5.1-1.1.2-1.6c3.2-21.8 23.2-36.8 44.7-33.5s36.3 23.5 33.1 45.3c-.1.5-.2 1.1-.3 1.6c-1 5.3-7.4 6.4-11.8 3.3zm136.2 15.5c-1 5.3-7.4 6.4-11.8 3.3c-7.7-5.5-16.8-9.3-26.8-10.8s-19.8-.6-28.7 2.4c-5.1 1.7-10.9-1.3-10.3-6.7c.1-.5.1-1.1.2-1.6c3.2-21.8 23.2-36.8 44.7-33.5s36.3 23.5 33.1 45.3c-.1.5-.2 1.1-.3 1.6zM530 350.2c-19.6 44.7-66.8 72.5-116.8 64.9s-87.1-48.2-93-96.7c-1-8.3 8.9-12.1 15.2-6.7c23.9 20.8 53.6 35.3 87 40.3s66.1.1 94.9-12.8c7.6-3.4 16 3.2 12.6 10.9z"
          ></path>
        </svg>
      ),

      dkv: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 19q-.825 0-1.412-.587T1 17V7q0-.825.588-1.412T3 5h10q.825 0 1.413.588T15 7v10q0 .825-.587 1.413T13 19zm4.5-5l-1-1.325q-.15-.2-.4-.187t-.4.212l-1.125 1.5q-.2.25-.038.525T5 15h6q.3 0 .45-.275t-.05-.525l-1.6-2.175q-.15-.2-.4-.2t-.4.2zM18 19q-.425 0-.712-.288T17 18V6q0-.425.288-.712T18 5t.713.288T19 6v12q0 .425-.288.713T18 19m4 0q-.425 0-.712-.288T21 18V6q0-.425.288-.712T22 5t.713.288T23 6v12q0 .425-.288.713T22 19"
          ></path>
        </svg>
      ),

      film: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M13.218 4.246L7.087 6.238a.5.5 0 0 1-.24.079L4.741 7H13.5a.5.5 0 0 1 .5.5v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-5c0-.106.033-.205.09-.287l-.195-.602A2.5 2.5 0 0 1 3.5 3.461l6.657-2.163a2.5 2.5 0 0 1 3.15 1.605l.232.713a.5.5 0 0 1-.321.63m-3.744.165l1.285-2.226a1.5 1.5 0 0 0-.293.064l-1.245.404l-1.308 2.265zm2.295-1.979l-.02.037l-.854 1.48l1.538-.5l-.077-.237a1.5 1.5 0 0 0-.587-.78m-3.97.683l-1.56.507L4.93 5.887l1.56-.507zM2.923 6.54l.587-.19l1.307-2.266l-1.008.328a1.5 1.5 0 0 0-.963 1.89z"
          ></path>
        </svg>
      ),

      foto: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 512 512"
        >
          <circle cx={256} cy={272} r={64} fill="currentColor"></circle>
          <path
            fill="currentColor"
            d="M456 144h-83c-3 0-6.72-1.94-9.62-5L336.1 96.2C325 80 320 80 302 80h-92c-18 0-24 0-34.07 16.21L148.62 139c-2.22 2.42-5.34 5-8.62 5v-16a8 8 0 0 0-8-8H92a8 8 0 0 0-8 8v16H56a24 24 0 0 0-24 24v240a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V168a24 24 0 0 0-24-24M260.51 367.9a96 96 0 1 1 91.39-91.39a96.11 96.11 0 0 1-91.39 91.39"
          ></path>
        </svg>
      ),
      musik: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M22 7.019v-4a1 1 0 0 0-.354-.782a1 1 0 0 0-.829-.22L8.852 4.01A1 1 0 0 0 8 5.017v9.519A4 4 0 1 0 10 18V9.846L20 8.18v4.355A4 4 0 1 0 22 16z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),

      senirupa: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17.5 12a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 17.5 9a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-3-4A1.5 1.5 0 0 1 13 6.5A1.5 1.5 0 0 1 14.5 5A1.5 1.5 0 0 1 16 6.5A1.5 1.5 0 0 1 14.5 8m-5 0A1.5 1.5 0 0 1 8 6.5A1.5 1.5 0 0 1 9.5 5A1.5 1.5 0 0 1 11 6.5A1.5 1.5 0 0 1 9.5 8m-3 4A1.5 1.5 0 0 1 5 10.5A1.5 1.5 0 0 1 6.5 9A1.5 1.5 0 0 1 8 10.5A1.5 1.5 0 0 1 6.5 12M12 3a9 9 0 0 0-9 9a9 9 0 0 0 9 9a1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.74-.39-1c-.23-.27-.38-.62-.38-1a1.5 1.5 0 0 1 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8"
          ></path>
        </svg>
      ),

      tv: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
            <path
              fill="currentColor"
              d="M16.95 4.007a1 1 0 0 0-1.414-1.414l-3.89 3.889a.5.5 0 0 1-.707 0L8.464 4.007A1 1 0 0 0 7.05 5.42l1.414 1.414q.086.086.175.165H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5.053a5 5 0 0 0 .174-.165z"
            ></path>
          </g>
        </svg>
      ),
      iklan: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 8v6c1.7 0 3-1.3 3-3s-1.3-3-3-3m-8-1H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1v3c0 1.1.9 2 2 2h2v-5h2l4 4h2V3h-2z"
          ></path>
        </svg>
      ),
      penerbitan: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M202.24 74C166.11 56.75 115.61 48.3 48 48a31.36 31.36 0 0 0-17.92 5.33A32 32 0 0 0 16 79.9V366c0 19.34 13.76 33.93 32 33.93c71.07 0 142.36 6.64 185.06 47a4.11 4.11 0 0 0 6.94-3V106.82a15.9 15.9 0 0 0-5.46-12A143 143 0 0 0 202.24 74m279.68-20.7A31.33 31.33 0 0 0 464 48c-67.61.3-118.11 8.71-154.24 26a143.3 143.3 0 0 0-32.31 20.78a15.93 15.93 0 0 0-5.45 12v337.13a3.93 3.93 0 0 0 6.68 2.81c25.67-25.5 70.72-46.82 185.36-46.81a32 32 0 0 0 32-32v-288a32 32 0 0 0-14.12-26.61"
          ></path>
        </svg>
      ),
      games: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M12 6C6.477 6 2 10.477 2 16s4.477 10 10 10h8c5.523 0 10-4.477 10-10S25.523 6 20 6zm10 13a2 2 0 1 1-4 0a2 2 0 0 1 4 0m0-4a2 2 0 1 1 0-4a2 2 0 0 1 0 4m-12-3a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H7a1 1 0 1 1 0-2h2v-2a1 1 0 0 1 1-1"
          ></path>
        </svg>
      ),
      arsitek: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M232 216h-24V40a16 16 0 0 0-16-16H64a16 16 0 0 0-16 16v176H24a8 8 0 0 0 0 16h208a8 8 0 0 0 0-16m-68-72a12 12 0 1 1 12-12a12 12 0 0 1-12 12"
          ></path>
        </svg>
      ),
      desainproduk: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.9 4.9 0 0 1 12 1c2.76 0 5 2.24 5 5zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6m10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22"
          ></path>
        </svg>
      ),
      interior: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
        >
          <defs>
            <mask id="ipSFileCabinet0">
              <g fill="none" strokeWidth={4}>
                <path
                  fill="#fff"
                  stroke="#fff"
                  strokeLinejoin="round"
                  d="M42 4H6v10h36zm0 15H6v10h36zm0 15H6v10h36z"
                ></path>
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  d="M21 9h6m-6 15h6m-6 15h6"
                ></path>
              </g>
            </mask>
          </defs>
          <path
            fill="currentColor"
            d="M0 0h48v48H0z"
            mask="url(#ipSFileCabinet0)"
          ></path>
        </svg>
      ),
      aplikasi: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
        >
          <defs>
            <mask id="ipSBabyApp0">
              <g fill="none">
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth={5}
                  d="M43 26v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h9"
                ></path>
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={10}
                  d="M4 40h40"
                ></path>
                <circle
                  cx={30}
                  cy={17}
                  r={9}
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth={7}
                ></circle>
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={7}
                  d="M19 18v-2m22 2v-2M30 8c-.167-1-1.2-3.2-4-4m4 4c.083-1 .6-3.2 2-4"
                ></path>
                <circle cx={33} cy={16} r={2} fill="#000"></circle>
                <circle cx={27} cy={16} r={2} fill="#000"></circle>
              </g>
            </mask>
          </defs>
          <path
            fill="currentColor"
            d="M0 0h48v48H0z"
            mask="url(#ipSBabyApp0)"
          ></path>
        </svg>
      ),
      bars: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="currentColor"
        >
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        </svg>
      ),
    };
    return iconPaths[iconType] || null;
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button onClick={toggleSidebar} className="toggle-btn">
          {isOpen ? "Tutup" : "Buka"} Sidebar
        </button>
        <ul className="list-unstyled">
          {/* <li
            onClick={() => handleMenuClick("/dashboard")}
            className={`menu-item ${
              activeMenu == = "/dashboard" ? "active" : ""
            }`}
          >
            <i className="bi bi-house-door-fill"></i>{" "}
          </li> */}

          <li
            className={`menu-item ${
              activeMenu === "/list/kuliner" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/kuliner")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Kuliner"
          >
            <CustomIcon iconType="kuliner" />
          </li>

          <li
            className={`menu-item ${
              activeMenu === "/list/fashion" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/fashion")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Fashion"
          >
            <CustomIcon iconType="fashion" />
          </li>

          <li
            className={`menu-item ${
              activeMenu === "/list/kriya" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/kriya")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Kriya"
          >
            <CustomIcon iconType="kriya" /> {/* Ikon film */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/pertunjukan" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/pertunjukan")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Seni Pertunjukan"
          >
            <CustomIcon iconType="senipertunjukan" /> {/* Ikon home */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/dkv" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/dkv")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Desain Komunikasi Visual"
          >
            <CustomIcon iconType="dkv" /> {/* Ikon utensils */}
          </li>

          <li
            className={`menu-item ${
              activeMenu === "/list/film" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/film")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Film, Animasi, Video"
          >
            <CustomIcon iconType="film" /> {/* Ikon camera */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/fotografi" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/fotografi")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Fotografi"
          >
            <CustomIcon iconType="foto" /> {/* Ikon film */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/musik" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/musik")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Musik"
          >
            <CustomIcon iconType="musik" /> {/* Ikon home */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/rupa" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/rupa")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Seni Rupa"
          >
            <CustomIcon iconType="senirupa" /> {/* Ikon utensils */}
          </li>
          <li
            className={`menu-item ${activeMenu === "/list/tv" ? "active" : ""}`}
            onClick={() => handleMenuClick("/list/tv")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="TV & Radio"
          >
            <CustomIcon iconType="tv" /> {/* Ikon camera */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/iklan" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/iklan")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Periklanan"
          >
            <CustomIcon iconType="iklan" /> {/* Ikon film */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/penerbitan" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/penerbitan")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Penerbitan"
          >
            <CustomIcon iconType="penerbitan" /> {/* Ikon home */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/games" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/games")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Games"
          >
            <CustomIcon iconType="games" />
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/arsitek" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/arsitek")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Arsitektur"
          >
            <CustomIcon iconType="arsitek" />
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/desainproduk" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/desainproduk")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Desain Produk"
          >
            <CustomIcon iconType="desainproduk" /> {/* Ikon utensils */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/interior" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/interior")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Desain Interior"
          >
            <CustomIcon iconType="interior" /> {/* Ikon camera */}
          </li>
          <li
            className={`menu-item ${
              activeMenu === "/list/aplikasi" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("/list/aplikasi")}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Aplikasi"
          >
            <CustomIcon iconType="aplikasi" /> {/* Ikon film */}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
