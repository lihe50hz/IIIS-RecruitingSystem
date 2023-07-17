import React from 'react'
import { Text, View } from 'react-native'
import General, { Structure } from '../../src/Pages/Student'
import { pageStyles } from './App'

export const StudentHome: React.FC = () => {
    const general = new General()
    return (
        <Structure general={general}>
            <View style={[pageStyles.pageRow, { flex: 1, marginBottom: '2%' }]}>
                <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                    ---交叉信息院简介---
                </Text>
            </View>
            <View style={[pageStyles.pageRow, { flex: 7, alignItems: 'flex-start', width: '93%' }]}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                    {'    '}
                    清华大学交叉信息研究院，简称交叉信息院，成立于2011年1月。交叉信息院由计算机科学最高奖“图灵奖”得主、中国科学院院士、美国科学院外籍院士姚期智先生领导，是国内首个致力于交叉信息科学研究的教学科研单位，目标为建设世界一流的交叉信息研究机构，培养具有国际竞争力的拔尖创新人才。
                    交叉信息院涵盖姚期智院士2004年全职回国加入清华大学以来创办的数个顶尖人才培养项目及科学研究机构。其中，创立于2005年的清华学堂计算机科学实验班（姚班）已建成计算机科学和人工智能领域的人才培养高地；创建于2011年的清华大学量子信息中心，已成为量子计算机和量子网络的重要前沿研究基地。
                    在姚期智院士领导下，交叉信息院从国际视角深入探索一流学科建设的新理念，深化计算机科学与量子信息科学的交叉建设，学科布局不断拓展和完善，科学研究领域全面涵盖智能+、量子信息和金融科技三大前沿热门方向。智能+方向积极推进人工智能的创新理论及交叉学科应用；量子信息方向依托量子信息中心建成离子阱量子计算、超导量子计算、光量子网络等十多个国际尖端水准实验室平台；金融科技方向创新性地运用最新的信息科技探索提升金融业的整体效率和竞争力。
                    经过十余年深耕，交叉信息院建立起国际一流师资队伍，由姚期智院士领衔，囊括海外引进高层次人才36位，并培养成为各研究领域的带头人与青年骨干。交叉信息院目前有全日制学生近600人（含来自美国、加拿大、巴西、波兰、比利时、韩国等国家的国际学生十余人）。其中，本科生人才培养享誉海内外，获得国家级教学成果奖一等奖、北京市教学成果奖特等奖，输送的毕业生进入国际顶尖高校担任教职，并涌现出一批创新创业的领跑者。
                    2018年以来，交叉信息院积极探索对于国家重要基础产业的支持，广泛布局新型政产学研合作模式，与南京市、西安市、北京市、上海市等合作建设新型研发机构，依托多年积累的科技研发优势，在人工智能、量子信息、金融科技领域开拓科技创新与成果转化新格局。
                </Text>
            </View>
        </Structure>
    )
}