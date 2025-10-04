import Link from "next/link";
import Image from "next/image";
import ArrowBtn from "@/components/homepage/arrowbtn";

export default function BlogDakhni() {
  return (
    <>
      <div className="flex sm:mt-[10vh] flex-col p-2 md:px-10">
        <div className="relative bg-[#a4cde4] w-full md:w-4/5 max-w-[1200px] p-2 md:p-5 border-[10px] border-[#111c33] mx-auto">
          <div className="font-heading text-[#111c33] font-extrabold pt-2 sm:text-5xl text-3xl text-firefly text-center mt-5 mb-8 sm:mt-14 sm:mb-5">
            अरे बैगन ! - चलिये, जानते है दक्खनी की दुनिया
          </div>
          {/* <div className="flex items-center justify-center">
            <img src="/blog/1.svg" alt="Design" className="m-auto" />
          </div> */}

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center w-full gap-8 md:mx-16 p-5">
              <img
                src="/blog/blog-dakhni-poster.png"
                alt="Blog Poster"
                className="w-full md:w-1/2 border-[5px] border-[#1a365d]"
              />
            </div>

            <div className="font-poppins text-[20px] flex text-firefly md:pl-8 pt-8">
              <p className="text-firefly">Author: Ayan Pathan </p>
            </div>
          </div>

          <div className="text-justify font-poppins font-body text-[17px] text-firefly p-8 pl-[10px] pr-[10px] pt-[30px] pb-[30px]">
            <article className="p-2 lg:p-5">
              <p>
                हम हमारे रोज़-मर्रा कि ज़िंदगी में कई भाषाओं का इस्तेमाल करते है
                । मै अगर अपनी बात करूं तो मै अंग्रेज़ी, हिंदी, उर्दू, मराठी और
                दक्खनी का इस्तेमाल अपनी बातचीत में किया करता हूँ । हाँ जानता
                हूँ, हम सबको दक्खनी के बारे में ज्यादा कुछ नहीं पता, मै भी कुछ
                वक्त पहले तक नहीं जानता था । कोई नहीं । मुझे यकीन है कि आपने
                हैदराबादी भाषा के बारे में ज़रूर सुना होगा ।
              </p>
              <br />

              <p>
                यह भाषा हम सब ने सुनी है और हमें बड़ी मज़ाकिया और मस्करी लगती
                है, न जाने क्यों ।{" "}
                <strong className="text-lg text-firefly">
                  हम जिसे हैदराबादी भाषा कहते है उसका असली नाम दक्खनी है ।
                </strong>{" "}
                हैदराबादी भाषा कहते ही मेरे ज़ेहन में एक बात आती है जो कि लोगों
                ने मुझसे कई बार कही है,{" "}
                <strong className="text-lg text-firefly">
                  "और मियाँ, क्या चल रहा?"
                </strong>
              </p>

              <div className="flex justify-center my-4 md:mx-16">
                <Image
                  src="/blog/dakhni-content-1.jpg"
                  className="border-[5px] border-[#3A0622]"
                  alt="Hyderabad Language"
                  width={600}
                  height={400}
                />
              </div>
              <br />

              <p>
                <strong className="text-lg text-firefly">
                  हाओ, नक़्को, काइकू, कैसा, खाको, करको
                </strong>{" "}
                और न जाने कितने ऐसे अल्फ़ाज़ है जो कहीं न कहीं हमारी आम भाषा
                जैसे लगते है मगर है नहीं । दक्खनी भाषा के बारे में जब मैंने
                अच्छा-खासा पढ़ लिया तो मुझे एहसास हुआ कि हिंदी और उर्दू से यह
                कुछ अलग है । अक्सर यह भाषा दक्षिण हिंदुस्तान में ज़्यादा बोली
                जाती है ।
              </p>
              <br />
              <p>
                दक्खनी बोलना सिर्फ भाषा का ही नहीं बल्कि अल्फाज़ों पर जोर देने
                का भी खेल है । दक्खनी का नाम लेते ही मुझे एक लतीफ़ा याद आता है,
                जो लॉकडाउन के वक्त व्हॉट्सएप पर मंडरा रहा था । यह लतीफ़ा दक्खनी
                को समझने की मुश्किलों पर है ।
              </p>
              <br />

              <p>
                लतीफ़ा कुछ ऐसा है कि एक उर्दू के टीचर जो यूपी से थे, एक दफ़ा
                हैदराबाद आए । उन्हें चारमीनार जाना था और उन्हें रास्ता नहीं पता
                था ।
                <br />
                <br />
                राह चलते एक आदमी से उन्होंने पूछ लिया -
                <br />
                "के जनाब! यह चारमीनार, यहाँ से सीधा जाने पर ही आता है ना?"
                <br />
                आदमी ने जवाब दिया -
                <br />
                <strong className="text-lg text-firefly">हाओ!</strong>
                <br />
                टीचर को समझ न आया कि यह{" "}
                <strong className="text-lg text-firefly">हाओ</strong> क्या चीज़
                होती है ।
                <br />
                टीचर ने दूसरे शख्स से पूछा ।
                <br />
                फिरसे जवाब मिला -{" "}
                <strong className="text-lg text-firefly">हाओ!</strong>
                <br />
                जब टीचर ने एक और बंदे से पूछा तो उसने कुछ अलग जवाब दिया |
                <br />
                उसने कहा -{" "}
                <strong className="text-lg text-firefly">जी हाँ!</strong>
                <br />
                <br />
                तब जाकर टीचर को समझ आया कि दक्खनी में 'हाओ' का मतलब 'हाँ' होता
                है । अब शायद आपको थोड़ा थोड़ा समझ आ रहा होगा कि दक्खनी किसे कहते
                है !
                <br />
                <br />
                ऐसे ही बहुत से दक्खनी शब्दों को{" "}
                <strong className="text-lg text-firefly">
                  हम रोज़ इस्तेमाल करते है
                </strong>{" "}
                और हमें पता भी नहीं ! ख़ैर, जो असल सवाल ज़ेहन में आता है कि
                दक्खनी बाकी भाषाओं से इतना मेल क्यों खाती है । इसका जवाब देकर मै
                शायद आपके सारे सवालों का जवाब दे पाऊँगा । दक्खनी बड़ी पुरानी
                भाषा है । तजुर्बा रखने वाले लोगों का कहना है कि दक्खनी भाषा{" "}
                <strong className="text-lg text-firefly">
                  तकरीबन १४ वीं से १५ वीं सदी के बीच ईजाद हुई ।
                </strong>{" "}
                दक्खनी भाषा हिंदी, मराठी, कन्नड़ ,तेलुगु और पुरानी उर्दू से बनी
                है । इसीलिए यह भाषा महाराष्ट्र, तेलंगाना, आंध्र प्रदेश और
                कर्नाटक में ज़्यादा मशहूर है ।
                <br />
                <br />
              </p>

              <div className="flex justify-center my-4 md:mx-16">
                <Image
                  src="/blog/dakhni-content-2.png"
                  className="border-[5px] border-firefly"
                  alt="Dakhni Words"
                  width={600}
                  height={400}
                />
              </div>
              <br />

              <p>
                एक सवाल जो लाज़मी बनता है कि अगर यह भाषा इतनी मशहूर है तो{" "}
                <strong className="text-lg text-firefly">
                  यह लिखने में इस्तेमाल क्यों नहीं होती?
                </strong>
              </p>

              <p className="text-lg text-firefly">
                सच कहूँ तो यह भाषा कभी{" "}
                <strong className="text-lg text-firefly">लिखी जाती थी !</strong>{" "}
                बहमनी साम्राज्य के दौर में लगभग{" "}
                <strong className="text-lg text-firefly">सन १५८०</strong>, या
                उससे भी पहले ! दक्खनी बहमनी साम्राज्य की अधिकारिक भाषा हुआ करती
                थी । मुझे यह भी पता चला कि{" "}
                <strong className="text-lg text-firefly">
                  हैदराबाद के नवाब
                </strong>{" "}
                मोहम्मद क़ुली क़ुतुब शाह ने दक्खनी में बहुत-सी कविताएँ भी लिखी
                है । फिर दक्खनी का कागज़ पर{" "}
                <strong className="text-lg text-firefly">
                  इस्तेमाल होना ख़त्म कैसे हुआ?
                </strong>
                <br />
                <br />
                असल में जब मुगलों ने दक्कन को जीता था, तब उन्होंने निज़ामों को
                दक्कन का गवर्नर बना दिया । मुगल साम्राज्य के अंदर उर्दू ही
                अधिकारिक भाषा जैसे हुआ करती थी, जो कि दक्कन पर लागू कर दी गई ।
              </p>

              <p>
                तो, कुछ ऐसे{" "}
                <strong className="text-lg text-firefly">
                  दक्खनी का पेपर तक का सफ़र ख़त्म हुआ ।
                </strong>{" "}
                मगर! मेरा मानना है कि अगर किसी चीज़ को शिद्दत से चाहो तो वह आपके
                दिल में बस जाती है । और जो दिल में होता है, वह ज़ुबान तक तो आ ही
                जाता है । कुछ यही हुआ दक्खनी के साथ भी ।{" "}
                <strong className="text-lg text-firefly">
                  दक्खनी का इस्तेमाल होना कभी बंद ही नहीं हुआ
                </strong>
                , जिसकी बदौलत आज भी दक्खनी बड़े पैमाने पर बोली जाती है । क्या
                समझे ! लिखी नहीं जाती तो भाषा विलुप्त हो जाएगी ?{" "}
                <strong className="text-lg text-firefly">
                  ये कैसी बैगन की बातें सोच रहे हो यार!
                </strong>
              </p>

              {/* <div className="bg-[#F5E6D3] p-4 my-6 rounded-lg border-2 border-[#3A0622]"> */}
              {/* <p className="font-medium text-lg mb-2">बैगन का मसला!</p> */}
              <br />

              <p>
                बैंगन ❌<br />
                बैगन ✔<br />
                <br />
                आपने ज़रूर 'अंडे का फंडा' यह जुमला सुना होगा, पर आज मै आपको
                बताना चाहता हूँ{" "}
                <strong className="text-lg text-firefly">
                  'बैगन का मसला' !
                </strong>{" "}
                बैगन आपके लिए सिर्फ़ एक सब्ज़ी होगी, पर मुझ जैसे कई लोगों के लिए
                बैगन एक{" "}
                <strong className="text-lg text-firefly">
                  सब्ज़ी से कहीं बढ़कर है !
                </strong>{" "}
                जी हाँ, दक्खनी बोलने वाले काफ़ी लोग बैगन को अपने जज़्बातों का
                इज़हार करने के लिए इस्तेमाल करते है । बैगन, दक्खनी में सिर्फ
                सब्ज़ी नहीं रहती बल्कि{" "}
                <strong className="text-lg text-firefly">विशेषण</strong> बन जाती
                है । बैगन ज़्यादातर एक{" "}
                <strong className="text-lg text-firefly">स्लैंग शब्द</strong>{" "}
                जैसे या फिर कोई{" "}
                <strong className="text-lg text-firefly">
                  ख़राब या गलत हुई चीज़
                </strong>{" "}
                को दर्शाने के लिए इस्तेमाल किया जाता है । मै आपको एक चित्र के
                सहारे समझाता हूँ ।
              </p>
              {/* </div> */}

              <div className="flex justify-center items-center my-4 border-5 border-firefly md:w-5/12 mx-auto">
                <Image
                  src="/blog/dakhni-content-3.png"
                  alt="Historical Dakhni"
                  width={300}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              <br></br>
              <p>
                <strong className="text-lg text-firefly">
                  दक्खनी और मराठी
                </strong>{" "}
                का रिश्ता भी हिंदी या उर्दू की तरह ही बहुत खास है । जैसा मैंने
                पहले बताया था, दक्खनी मराठी से भी बनी है, तो हमें इन दोनों
                भाषाओं में बहुत-सी समानताएँ नज़र आती है । मुझे याद है कुछ शब्द
                जैसे 'फ़ज़ीती' हमें दोनों भाषाओं में इस्तेमाल होते हुए नज़र आते
                है । इन दोनों भाषाओं के{" "}
                <strong className="text-lg text-firefly">
                  ‘फ़ोनेटिक पैटर्न’
                </strong>{" "}
                में भी कई समानताएँ है, जिसके कारण इन भाषाओं पर{" "}
                <strong className="text-lg text-firefly">
                  ‘द्रविड़ियन इन्फ्लुएंस’
                </strong>{" "}
                देखने को मिलता है ।
              </p>
              <br />
              <p>
                <strong className="text-lg text-firefly">
                  दक्खनी, उर्दू और कन्नड़ में महत्वपूर्ण समानताएँ है
                </strong>
                , विशेष रूप से दक्कन क्षेत्र में ऐतिहासिक संपर्कों के कारण । इन
                भाषाओं पर फारसी और अरबी का प्रभाव है, जो दक्कन सुलतानतों के
                ऐतिहासिक शासन का परिणाम है । उदाहरण स्वरूप, सामान्य शब्दों में{" "}
                <strong className="text-lg text-firefly">‘दरवाजा’</strong>{" "}
                (दरवाज़ा) और{" "}
                <strong className="text-lg text-firefly">‘महमान’</strong>{" "}
                (मेहमान) शामिल है । इसके अतिरिक्त, दोनों भाषाओं में रोज-मर्रा की
                चीजों के लिए समान शब्द है :{" "}
                <strong className="text-lg text-firefly">‘किताब’</strong>{" "}
                (पुस्तक) दक्खनी और उर्दू में है, जब कि कन्नड़ में इसे{" "}
                <strong className="text-lg text-firefly">‘पुस्तका’</strong> कहा
                जाता है । दखनी में{" "}
                <strong className="text-lg text-firefly">‘रोटी’</strong>, उर्दू
                में भी ‘रोटी’ ही है, जबकि कन्नड़ में इसे{" "}
                <strong className="text-lg text-firefly">‘रोट्टी’</strong> कहा
                जाता है । वाक्य रचनाएँ और व्याकरण में भी समानताएँ दिखाई देती है,
                अक्सर ये वाक्य संरचनाएँ Subject-Object-Verb (SOV) क्रम का पालन
                करती है ।
              </p>

              <p className="mt-6">
                अब आपको दक्खनी के बारे में थोड़ी बहुत जानकारी तो मैंने दे दी है,
                अब आप इसे कहाँ इस्तेमाल करते है यह आप पर है । अब दिल से दो शब्द
                कहकर आपसे विदा लेता हूँ ।
                <br />
                <br />
                छोड़ो कल की बातें, कल कि बाते{" "}
                <strong className="text-lg text-firefly">बैगन</strong> की,
                <br />
                पढ़ने लिखनेसे दूर हुई तब भी{" "}
                <strong className="text-lg text-firefly">
                  अयान है दक्खनी !
                </strong>
              </p>

              <br />
            </article>

            <div className="flex flex-col items-center w-full">
              {/* <div className="flex justify-center w-full mb-4">
                <img src="/blog/3.svg" alt="Content Image" className="w-7/10" />
              </div> */}
              <div className="flex">
                <ArrowBtn text="Back" path={`/blogs`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
