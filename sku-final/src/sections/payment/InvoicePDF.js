import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { fCurrency } from 'utils/formatNumber';

import logo from 'assets/images/sku-market-default-cover-profile.jpg';

const InvoicePDF = () => {
  const styles = StyleSheet.create({
    col4: { width: '25%' },
    col8: { width: '75%' },
    col6: { width: '50%' },
    mb8: { marginBottom: 8 },
    mb40: { marginBottom: 40 },
    overline: {
      fontSize: 8,
      marginBottom: 8,
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h3: { fontSize: 16, fontWeight: 700 },
    h4: { fontSize: 13, fontWeight: 700 },
    body1: { fontSize: 10 },
    subtitle2: { fontSize: 9, fontWeight: 700 },
    alignRight: { textAlign: 'right' },
    page: {
      padding: '40px 24px 0 24px',
      fontSize: 9,
      lineHeight: 1.6,
      backgroundColor: '#fff',
      textTransform: 'capitalize',
    },
    footer: {
      left: 0,
      right: 0,
      bottom: 0,
      padding: 24,
      margin: 'auto',
      borderTopWidth: 1,
      borderStyle: 'solid',
      position: 'absolute',
      borderColor: '#DFE3E8',
    },
    gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    table: { display: 'flex', width: 'auto' },
    tableHeader: {},
    tableBody: {},
    tableRow: {
      padding: '8px 0',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: '#DFE3E8',
    },
    noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
    tableCell_1: { width: '5%' },
    tableCell_2: { width: '50%', paddingRight: 16 },
    tableCell_3: { width: '15%' },
  });

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={[styles.gridContainer, styles.mb40]}>
            <Image source={logo} style={{ height: 32 }} />
            <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
              <Text style={styles.h3}>Paid</Text>
              <Text> {`INV-asdfasdfd`} </Text>
            </View>
          </View>

          <View style={[styles.gridContainer, styles.mb40]}>
            <View style={styles.col6}>
              <Text style={[styles.overline, styles.mb8]}>Invoice from</Text>
              <Text style={styles.body1}>Invoice From Name</Text>
              <Text style={styles.body1}>Invoice From Address</Text>
              <Text style={styles.body1}>Invoice From Phone</Text>
            </View>

            <View style={styles.col6}>
              <Text style={[styles.overline, styles.mb8]}>Invoice to</Text>
              <Text style={styles.body1}>Invoice Name</Text>
              <Text style={styles.body1}>Invoice Address</Text>
              <Text style={styles.body1}>Invoice Phone</Text>
            </View>
          </View>

          <View style={[styles.gridContainer, styles.mb40]}>
            <View style={styles.col6}>
              <Text style={[styles.overline, styles.mb8]}>Date create</Text>
              <Text style={styles.body1}>17-03-2023</Text>
            </View>
            <View style={styles.col6}>
              <Text style={[styles.overline, styles.mb8]}>Due date</Text>
              <Text style={styles.body1}>30-04-2023</Text>
            </View>
          </View>

          <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell_1}>
                  <Text style={styles.subtitle2}>#</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>Description</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Qty</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={styles.subtitle2}>Unit price</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.subtitle2}>Total</Text>
                </View>
              </View>
            </View>

            <View style={styles.tableBody}>
              <View style={styles.tableRow}>
                <View style={styles.tableCell_1}>
                  <Text>5</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>sdfasdfj alsdfkl asdf sdalf sadf</Text>
                  <Text>
                    loreljlskdjf lasjdflasdjlkfasdf a asdjfklas jdfklasd fasd lfjasdlf aslkdfj
                    asdjflasjdfkl asdfj{' '}
                  </Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>54</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>98</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(98 * 5)}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Subtotal</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(150)}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Discount</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(-10)}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Taxes</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(45)}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text style={styles.h4}>Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.h4}>{fCurrency(120)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.gridContainer, styles.footer]}>
            <View style={styles.col8}>
              <Text style={styles.subtitle2}>NOTES</Text>
              <Text>
                We appreciate your business. Should you need us to add VAT or extra notes let us
                know!
              </Text>
            </View>
            <View style={[styles.col4, styles.alignRight]}>
              <Text style={styles.subtitle2}>Have a Question?</Text>
              <Text>support@abcapp.com</Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default InvoicePDF;
