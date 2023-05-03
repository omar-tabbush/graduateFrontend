import { Text, View } from "@react-pdf/renderer";
import { useEffect } from "react";
import styled from "styled-components";
import postcss from "postcss";
import cssjs from "postcss-js";
import postcssJs from "postcss-js";

function toJS(css) {
  try {
    //check if css is undefinded
    if (!css) {
      return {};
    }
    const jsCode = postcss.parse(css);
    return postcssJs.objectify(jsCode);
  } catch (err) {
    console.error("Couldn't convert CSS to JS.", err);
  }
}

export const CVCV = ({ data, styling }) => {
  useEffect(() => {
    console.log(styling);
  }, [styling]);
  return (
    <View style={{ ...toJS(styling?.cv) }}>
      <View style={toJS(styling?.head)}>
        <View style={toJS(styling?.info)}>
          <Text style={toJS(styling?.full_name)}>{data?.fname}</Text>

          <Text style={toJS(styling?.specialization)}>
            {data?.specialization}
          </Text>

          <Text style={toJS(styling?.desc)}>{data?.desc} </Text>
        </View>
        <View style={toJS(styling?.links)}>
          {data?.linkedin ? (
            <Text style={toJS(styling?.link)}>
              <a src={data?.linkedin}>
                <Text>{data?.fname}</Text>
              </a>
            </Text>
          ) : null}
          {data?.github ? (
            <Text style={toJS(styling?.link)}>
              <a src={data?.github}>
                <Text>{data?.fname}</Text>
              </a>
            </Text>
          ) : null}
          {data?.portfolio ? (
            <Text style={toJS(styling?.link)}>
              <a src={data?.portfolio}>
                <Text>{data?.fname}</Text>
              </a>
            </Text>
          ) : null}

          {data?.email ? (
            <Text style={toJS(styling?.link)}>{data?.email}</Text>
          ) : null}
          {data?.address ? (
            <Text style={toJS(styling?.link)}>
              <a src={data?.address}>
                <Text> {data?.address}</Text>
              </a>
            </Text>
          ) : null}
          <Text style={toJS(styling?.link)}> {data?.phone}</Text>
        </View>
      </View>
      <View style={toJS(styling?.body)}>
        {data.work[0].title && (
          <View style={toJS(styling?.section)}>
            <Text style={toJS(styling?.section_title)}> work </Text>
            {data?.work?.map((item, key) => (
              <div key={key}>
                <Text style={toJS(styling?.section_subtitle)}>
                  {item?.title}
                </Text>
                <Text style={toJS(styling?.section_subtitle2)}>
                  {item?.company}
                </Text>
                <Text style={toJS(styling?.section_date)}>
                  <>{item?.startDate}</> <div> {item?.endDate} </div>
                </Text>
                <Text style={toJS(styling?.section_location)}>
                  {item?.location}
                </Text>
                {item?.description ? (
                  <Text style={toJS(styling?.section_list_title)}>
                    achivements
                  </Text>
                ) : (
                  null
                )}
                <ul>
                  {item?.description?.split("\n")?.map((achiv, achikey) =>
                    achiv ? (
                      <Text
                        style={toJS(styling?.section_list_item)}
                        key={achikey}
                      >
                        {achiv}
                      </Text>
                    ) : (
                      null
                    )
                  )}
                </ul>
              </div>
            ))}
          </View>
        )}
        {data?.education[0].field ? (
          <View style={toJS(styling?.section)}>
            <Text style={toJS(styling?.section_title)}> Education </Text>
            {data?.education?.map((item, key) => (
              <div key={key}>
                <Text style={toJS(styling?.section_subtitle)}>
                  {item?.degree} in {item?.field}
                </Text>
                <Text style={toJS(styling?.section_subtitle2)}>
                  {item?.institution}
                </Text>
                <Text style={toJS(styling?.Text)}>
                  {item?.startDate} {item?.endDate}
                </Text>
                <Text style={toJS(styling?.section_location)}>
                  {item?.location}
                </Text>
              </div>
            ))}
          </View>
        ) : (
          null
        )}
        {data?.tech[0].name ? (
          <View style={toJS(styling?.section)}>
            <Text style={toJS(styling?.section_title)}> Technologies</Text>
            <ul>
              {data?.tech?.map((item, key) =>
                item ? (
                  <div key={key}>
                    <Text style={toJS(styling?.section_list_item)}>
                      {item?.name}
                    </Text>
                  </div>
                ) : (
                  null
                )
              )}
            </ul>
          </View>
        ) : (
          null
        )}
        {data?.language[0].name ? (
          <View style={toJS(styling?.section)}>
            <Text style={toJS(styling?.section_title)}> Languages</Text>
            <ul>
              {data?.language?.map((item, key) =>
                item ? (
                  <div key={key}>
                    <Text style={toJS(styling?.section_list_item)}>
                      {item?.name}
                    </Text>
                  </div>
                ) : (
                  null
                )
              )}
            </ul>
          </View>
        ) : (
          null
        )}
        {data?.project[0].name ? (
          <View style={toJS(styling?.section)}>
            <Text style={toJS(styling?.section_title)}> Projects</Text>
            {data?.project?.map((item, key) => (
              <div key={key}>
                <Text style={toJS(styling?.section_subtitle)}>
                  {item?.name}
                </Text>

                <Text style={toJS(styling?.section_date)}> {item?.date}</Text>
                <ul>
                  {item?.description?.split("\n")?.map((info, infoKey) =>
                    info !== null ? (
                      <Text
                        style={toJS(styling?.section_list_item)}
                        key={infoKey}
                      >
                        {info}
                      </Text>
                    ) : (
                      null
                    )
                  )}
                </ul>
              </div>
            ))}
          </View>
        ) : (
          null
        )}
      </View>
    </View>
  );
};
export default CVCV;
